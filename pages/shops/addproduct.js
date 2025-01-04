import Product from "@/components/Shop";
import { GrProjects } from "react-icons/gr";

export default function Addproduct() {
  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Add<span>Product</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <GrProjects />
            <span>/</span>
            <span>Add Product</span>
          </div>
        </div>
        <div className="blogsadd">
          <Product />
        </div>
      </div>
    </>
  );
}
