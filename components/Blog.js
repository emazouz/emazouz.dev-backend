import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";

export default function Blog({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  blogCategory: existingBlogCategory,
  tags: existingTags,
  status: existingStatus,
  overview: existingOverview,
  authorsName: existingAuthorsName,
  authorsImg: existingAuthorsImg,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [blogCategory, setBlogCategory] = useState(existingBlogCategory || []);
  const [tags, setTags] = useState(existingTags || []);
  const [authorsName, setAuthorsName] = useState(existingAuthorsName || "");
  const [authorsImg, setAuthorsImg] = useState(existingAuthorsImg || null);
  const [status, setStatus] = useState(existingStatus || "");
  const [overview, setOverview] = useState(existingOverview || "");
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];
  async function createBlog(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    // بيانات المدونة
    const data = {
      title,
      slug,
      images,
      description,
      blogCategory,
      tags,
      status,
      overview,
      authorsName,
      authorsImg,
    };

    // تحقق من البيانات قبل الإرسال
    if (!title || !slug || !description || !blogCategory) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      // setLoading(true); // بدء حالة التحميل

      if (_id) {
        // تحديث بيانات موجودة
        await axios.put("/api/blogs", { ...data, _id });
        toast.success("Blog updated successfully!");
      } else {
        // إنشاء مدونة جديدة
        await axios.post("/api/blogs", data);
        toast.success("Blog created successfully!");
      }
      setRedirect(true); // إعادة توجيه بعد الإرسال بنجاح
    } catch (error) {
      // عرض رسالة الخطأ
      toast.error(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    }
  }

  async function uploadImages(e) {
    const files = e.target.files;
    if (files?.length > 0) {
      setIsUploading(true);

      try {
        const uploadPromises = Array.from(files).map((file) => {
          const data = new FormData();
          data.append("file", file);

          return axios.post("/api/upload", data).then((res) => res.data.links);
        });

        const uploadedLinks = await Promise.all(uploadPromises);
        setImages((oldImages) => [...oldImages, ...uploadedLinks.flat()]); // Flatten to handle multiple links
        toast.success("Images uploaded successfully!");
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("An error occurred while uploading images.");
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("No files selected.");
    }
  }

  if (redirect) {
    router.push("/blogs");
    return null;
  }

  function updloadImagesOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success("Image deleted successfully!");
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };

  const handleAuthorsImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => setAuthorsImg(reader.result);
      reader.readAsDataURL(file);

      // محاكاة عملية الرفع
      setIsUploading(true);
      setTimeout(() => {
        console.log("Image uploaded:", file.name);
        setIsUploading(false);
      }, 1000);
    }
  };

  return (
    <>
      <form className="addWebsiteform" onSubmit={createBlog}>
        {/* blog title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="enter small title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="authorsName">Authors Name</label>
          <input
            type="text"
            id="authorsName"
            placeholder="enter small authorsName"
            value={authorsName}
            onChange={(ev) => setAuthorsName(ev.target.value)}
          />
        </div>

        <div className="w-100 flex flex-col flex-left -mb-2">
          <div className="w-100">
            <label htmlFor="authorsImg">
              Authors Image (first image will be shown as thumbnail)
            </label>
            <input
              type="file"
              id="authorsImg"
              className="mt-1"
              accept="image/*"
              onChange={handleAuthorsImageChange}
            />
          </div>
          {authorsImg && (
            <div className="w-100 flex flex-left mt-1">
              <img
                src={authorsImg}
                alt="Preview"
                className="h-20 w-20 object-cover rounded"
              />
            </div>
          )}
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>

        {/* blog stug url */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug (seo friendly url)</label>
          <input
            type="text"
            id="slug"
            placeholder="enter slug url"
            value={slug}
            onChange={handleSlugChange}
          />
        </div>
        {/* overview */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="overview">Overview (description)</label>
          <input
            type="text"
            placeholder="enter your description"
            value={overview}
            id="overview"
            onChange={(ev) => setOverview(ev.target.value)}
          />
        </div>
        {/* blog cetegory */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select Category (for multiple select press ctr + mouse left key)
          </label>
          <select
            name="category"
            id="category"
            multiple
            onChange={(e) =>
              setBlogCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={blogCategory}
          >
            <option value="Programming Tips">Programming Tips</option>
            <option value="Trending Blogs">Trending Blogs</option>
            <option value="Top Tools">Top Tools</option>
          </select>
        </div>
        {/* blog image */}
        <div className="w-100 flex flex-col flex-left -mb-2">
          <div className="w-100">
            <label htmlFor="images">
              images (first image will be show as thumbnail, you can drag)
            </label>
            <input
              type="file"
              id="fileInput"
              className="mt-1"
              accept="image/*"
              multiple
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>

        {/* image priview and image sortable */}
        {!isUploading && (
          <div className="flex">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updloadImagesOrder}
              animation={200}
              className="flex gap-1"
            >
              {images?.map((link, index) => (
                <div key={link} className="uploadedimg">
                  <img src={link} alt="image" className="object-cover" />
                  <div className="deleteimg">
                    <button onClick={() => handleDeleteImage(index)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        {/* markdown description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label className="des">
            Blog Content (for image: first upload and copy link and paste in !
            [alt text](link))
          </label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{
              width: "100%",
              height: "400px",
            }}
            renderHTML={(text) => {
              return (
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      if (inline) {
                        return <code>{children}</code>;
                      } else if (match) {
                        return (
                          <div style={{ position: "relative" }}>
                            <pre
                              style={{
                                padding: "0",
                                borderRadius: "6px",
                                overflow: "auto",
                                whiteSpace: "pre-wrap",
                              }}
                              {...props}
                            >
                              <code>{children}</code>
                            </pre>
                            <button
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                zIndex: "1",
                              }}
                              onClick={() =>
                                navigator.clipboard.writeText(children)
                              }
                            >
                              Copy code
                            </button>
                          </div>
                        );
                      }
                      return <code {...props}>{children}</code>;
                    },
                  }}
                >
                  {text}
                </ReactMarkdown>
              );
            }}
          />
        </div>
        {/* tegs */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            name="tags"
            id="tags"
            multiple
            value={tags}
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="Html">Html</option>
            <option value="Css">Css</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Next Js">Next Js</option>
            <option value="React Js">React Js</option>
            <option value="Database">Database</option>
          </select>
        </div>

        {/* blog status */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">No Select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            SAVE BLOG
          </button>
        </div>
      </form>
    </>
  );
}
