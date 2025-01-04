import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import Head from "next/head";
export default function Photo({
    _id,
    title: existingTitle,
    slug: existingSlug,
    images: existingImages,
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();
  
    const [title, setTitle] = useState(existingTitle || "");
    const [slug, setSlug] = useState(existingSlug || "");
    const [images, setImages] = useState(existingImages || []);

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
        };
    
        // تحقق من البيانات قبل الإرسال
        if (!title || !slug || !images) {
          toast.error("Please fill in all required fields!");
          return;
        }
    
        try {
          // setLoading(true); // بدء حالة التحميل
    
          if (_id) {
            // تحديث بيانات موجودة
            await axios.put("/api/photos", { ...data, _id });
            toast.success("Blog updated successfully!");
          } else {
            // إنشاء مدونة جديدة
            await axios.post("/api/photos", data);
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
        router.push("/gallery");
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

    return <>
        <Head>
            <title>Gallerys</title>
        </Head>

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
        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            SAVE DATA
          </button>
        </div>
      </form>

    </>
}

