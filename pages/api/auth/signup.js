// // pages/auth/signup.js
// import { mongooseConnect } from "@/lib/mongoose";
// import Profile from "@/models/Profile";

// export default async function handler(req, res) {
//   await mongooseConnect();
//   const { email, password } = req.body;
//   try {
//     const existingUser = await Profile.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }
//     const newUser = await Profile.create({ email, password });
//     res.status(200).json({ message: "User Create Successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// }
import { mongooseConnect } from "@/lib/mongoose";
import Profile from "@/models/Profile";

export default async function handler(req, res) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ error: "Method not allowed" });
  // }

  await mongooseConnect();

  const { email, password } = req.body;

  // تحقق من إدخال الحقول المطلوبة
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // التحقق من وجود المستخدم بالفعل
    const existingUser = await Profile.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // إنشاء المستخدم الجديد
    const newUser = await Profile.create({ email, password });

    // إرسال استجابة ناجحة
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
}
