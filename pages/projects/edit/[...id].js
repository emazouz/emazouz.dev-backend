import Project from "@/components/Project";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaBloggerB } from "react-icons/fa";

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query; // الحصول على id من الرابط
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (id) {
      // إذا كان id موجودًا، قم بجلب البيانات
      axios
        .get("/api/projects?id=" + id)
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]); // إضافة id كاعتماد

  return (
    <>
      <div>
        <Head>
          <title>Update Projects</title>
        </Head>
        <div className="blogpage">
                    <div className="titledashboard flex flex-sb">
                      <div>
                        <h2>
                          Edit<span>{productInfo?.title}</span>
                        </h2>
                        <h3>ADIM PANEL</h3>
                      </div>
                      <div className="breadcrumb">
                        <FaBloggerB />
                        <span>/</span>
                        <span>Edit Projects</span>
                      </div>
                    </div>

          <div className="mt-3">
              {
                productInfo && (
                  <Project {...productInfo}/>
                )
              }
          </div>
        </div>
      </div>
    </>
  );
}
