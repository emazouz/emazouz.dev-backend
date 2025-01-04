import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBloggerB } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = router.query; // الحصول على id من الرابط
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (id) {
      // إذا كان id موجودًا، قم بجلب البيانات
      axios
        .get("/api/blogs?id=" + id)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]); // إضافة id كاعتماد

  function goBack() {
    router.push("/blogs");
  }

  async function deleteBlog() {
    await axios.delete("/api/blogs?id=" + id);
    toast.success("Delete Successfull");
    goBack();
  }

  return (
    <>
      <div>
        <Head>
          <title>Remove Blogs</title>
        </Head>
        <div className="blogpage">
          <div className="titledashboard flex flex-sb">
            <div>
              <h2>
                Delete<span>{productInfo?.title}</span>
              </h2>
              <h3>ADIM PANEL</h3>
            </div>
            <div className="breadcrumb">
              <FaBloggerB />
              <span>/</span>
              <span>Remove Blog</span>
            </div>
          </div>

          <div className="deletesec flex flex-center wh_100">
            <div className="deletecard">
              <h2>Are you sure you want to delete the blog?</h2>
              <div className="buttonContainer">
                <button onClick={deleteBlog} className="acceptButton">Delete</button>
                <button onClick={goBack} className="declineButton">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
