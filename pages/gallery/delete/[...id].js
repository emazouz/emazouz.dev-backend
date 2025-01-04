import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { GrGallery } from "react-icons/gr";

export default function DeletePhoto() {
  const router = useRouter();
  const { id } = router.query; // الحصول على id من الرابط
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (id) {
      // إذا كان id موجودًا، قم بجلب البيانات
      axios
        .get("/api/photos?id=" + id)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]); // إضافة id كاعتماد

  function goBack() {
    router.push("/gallery");
  }

  async function deleteBlog() {
    await axios.delete("/api/photos?id=" + id);
    toast.success("Delete Successfull");
    goBack();
  }

  return (
    <>
      <div>
        <Head>
          <title>Remove Photo</title>
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
              <GrGallery />
              <span>/</span>
              <span>Remove Photo</span>
            </div>
          </div>

          <div className="deletesec flex flex-center wh_100">
            <div className="deletecard">
              <h2>Are you sure you want to delete the product?</h2>
              <div className="buttonContainer">
                <button onClick={deleteBlog} className="acceptButton">
                  Delete
                </button>
                <button onClick={goBack} className="declineButton">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
