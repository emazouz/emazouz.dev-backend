import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        // الاتصال بقاعدة البيانات
        const db = await connectToDatabase();
        const collection = db.collection("admin");

        // البحث عن المستخدم
        const user = await collection.findOne({ email: email });

        if (!user) {
          throw new Error("Invalid email or password.");
        }

        // التحقق من كلمة المرور
        if (user.password !== password) {
          throw new Error("Invalid email or password.");
        }

        // إرجاع بيانات المستخدم
        return { id: user._id, email: user.email };
      },
    }),
  ],

  database: process.env.MONGODB_URI,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  // secret: process.env.NEXTAUTH_SECRET,
});
