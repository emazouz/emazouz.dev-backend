import Photo from "@/models/Photo";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  try {
    if (method === "POST") {
      const { title, slug, images } = req.body;

      // تحقق من الحقول الأساسية
      if (!title || !slug || !images) {
        return res
          .status(400)
          .json({ message: "Required fields are missing." });
      }

      const blogDoc = await Photo.create({
        title,
        slug,
        images,
      });
      return res.status(201).json(blogDoc);
    }

    if (method === "GET") {
      if (req.query?.id) {
        const blog = await Photo.findById(req.query.id);
        if (!blog) {
          return res.status(404).json({ message: "Project not found." });
        }
        return res.status(200).json(blog);
      } else {
        const blogs = await Photo.find().sort({ createdAt: -1 }); // ترتيب تنازلي بناءً على تاريخ الإنشاء
        return res.status(200).json(blogs);
      }
    }

    if (method === "PUT") {
      const { _id, title, slug, images } = req.body;

      if (!_id) {
        return res
          .status(400)
          .json({ message: "Project ID is required for update." });
      }

      const updatedBlog = await Photo.findByIdAndUpdate(
        _id,
        {
          title,
          slug,
          images,
        },
        { new: true } // يعيد المستند المُحدث
      );

      if (!updatedBlog) {
        return res.status(404).json({ message: "Project not found." });
      }

      return res.status(200).json(updatedBlog);
    }

    if (method === "DELETE") {
      if (!req.query?.id) {
        return res
          .status(400)
          .json({ message: "Project ID is required for deletion." });
      }

      const deletedBlog = await Photo.findByIdAndDelete(req.query.id);

      if (!deletedBlog) {
        return res.status(404).json({ message: "Project not found." });
      }

      return res.status(200).json({ message: "Project deleted successfully." });
    }

    return res.status(405).json({ message: "Method not allowed." });
  } catch (error) {
    console.error("Error in Project handler:", error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." });
  }
}
