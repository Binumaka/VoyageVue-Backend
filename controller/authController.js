const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const UserModel = require("../model/userModel");
const nodemailer=require("nodemailer");

const test = (req, res) => {
  res.json("test is working");
};

//register user
const registerUser = async (req, res) => {
  try{
    const { username, email, image, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({ username, email, image, password: hashedPassword, role });
  user.save();
  const transporter= nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            protocol:"smtp",
            auth:{
                user:"binumaka9@gmail.com",
                pass:"miue lhwd jffs jpbw"
            }
        })
  
        const info=transporter.sendMail({
            from:"binumaka9@gmail.com",
            to:user.email,
            subject:"User Registration",
            html:`
            <h1>Your Registration has been Completed</h1>
            <p>your user id is ${user.id}</p>
            `
        })
  
        res.status(201).json({user,info})
    }catch (e) {
        res.json(e)
    }
};


//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const cred = await UserModel.findOne({ email });
  if (!cred || !(await bcrypt.compare(password, cred.password))) {
    return res.status(403).send("Invalid username or password");
  }

  const token = jwt.sign(
    { username: cred.username, email: cred.email, role: cred.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token, userId: cred._id }); 
};

// Find user by ID
const findUserById = async (req, res) => {
  try {
      const userId = req.user._id;
      const user = await UserModel.findById(userId); 
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};


//Forget password
const forgetPassword = async (req, res) => {
  try {
      const { email } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      // Generate a reset token
      const resetToken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '15m' });
      console.log('Generated Token:', resetToken)

      // Set up Nodemailer
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
              user:"binumaka9@gmail.com",
              pass:"miue lhwd jffs jpbw"
          },
      });
      

      const mailOptions = {
          from: 'binumaka9@gmail.com',
          to: user.email,
          subject: 'Password Reset Request',
          html: `
              <h1>Password Reset</h1>
              <p>Click the link below to reset your password:</p>
              <a href="http://localhost:5000/reset-password?token=${resetToken}">Reset Password</a>
              <p>This link expires in 15 minutes.</p>
          `,
      
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ 
          message: 'Password reset email sent.',
          resetToken});
  } catch (error) {
      console.error('Error during forget password:', error);
      res.status(500).json({ error: 'Something went wrong.' });
  }
};


//Reset Password
const resetPassword = async (req, res) => {
  try {
      const { token, newPassword } = req.body;

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const user = await UserModel.findById(decoded._id);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
      console.error('Error during password reset:', error);

      if (error.name === 'TokenExpiredError') {
          return res.status(400).json({ error: 'Token expired. Please request a new password reset.' });
      }

      res.status(500).json({ error: 'Something went wrong.' });
  }
};


//upload image
const uploadImage = async(req, res, next) => {
  if (!req.file){
    return res.status(400).send({ message: "Please upload a file"});
  }
  res.status(200).json({
    success: true,
    data: req.file.filename,
  })
}

module.exports = {
  test,
  loginUser,
  findUserById,
  registerUser,
  uploadImage,
  forgetPassword,
  resetPassword,
};
