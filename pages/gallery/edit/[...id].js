import Photo from "@/components/photo";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GrGallery } from "react-icons/gr";



export default function EditPhoto() {
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
  
    return (
      <>
        <div>
          <Head>
            <title>Update Photos</title>
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
                        <GrGallery />
                          <span>/</span>
                          <span>Edit Photo</span>
                        </div>
                      </div>
  
            <div className="mt-3">
                {
                  productInfo && (
                    <Photo {...productInfo}/>
                  )
                }
            </div>
          </div>
        </div>
      </>
    );
  }
  