import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { FaBloggerB, FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";

export default function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // عدد العناصر في كل صفحة
  const [searchQuery, setSearchQuery] = useState(""); // بحث
  const { allData, loading } = useFetchData("/api/blogs");

  // إجمالي عدد المدونات
  const allBlog = allData?.length;

  // تصفية المدونات بناءً على البحث
  const filteredBlogs =
    searchQuery.trim() === ""
      ? allData || []
      : allData.filter((blog) =>
          blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // حساب عدد الصفحات بناءً على المدونات المصفاة
  const pageCount = Math.ceil(filteredBlogs.length / itemsPerPage);

  // تحديد المدونات المعروضة في الصفحة الحالية
  const indexOfFirstBlog = (currentPage - 1) * itemsPerPage;
  const indexOfLastBlog = currentPage * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishedBlogs = currentBlogs.filter((db) => db.status === "publish");

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  // التغيير بين الصفحات
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="addblogspage">
        {/* العنوان */}
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All<span>Blog</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaBloggerB />
            <span>/</span>
            <span>Blogs</span>
          </div>
        </div>

        {/* جدول المدونات */}
        <div className="blogstable">
          {/* البحث */}
          <div className="flex gap-2 mb-1">
            <h2>Search Blog</h2>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* الجدول */}
          <table className="table table-styling">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <Dataloading />
                  </td>
                </tr>
              ) : publishedBlogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Blogs Found
                  </td>
                </tr>
              ) : (
                publishedBlogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <td>{indexOfFirstBlog + index + 1}</td>
                    <td>
                      <img
                      style={{
                        width: '400px',
                        height: '300px',
                        
                      }}
                        src={blog.images[0] || "/placeholder.jpg"}
                        alt={blog.title}
                      />
                    </td>
                    <td>{blog.title}</td>
                    <td>
                      <div className="flex flex-center gap-2">
                        <Link href={"/blogs/edit/" + blog._id}>
                          <button>
                            <FaEdit />
                          </button>
                        </Link>
                        <Link href={"/blogs/delete/" + blog._id}>
                          <button>
                            <RiDeleteBinFill />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* الصفحات */}
          {publishedBlogs.length === 0 ? (
            ""
          ) : (
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {pageNumbers
                .slice(
                  Math.max(currentPage - 3, 0),
                  Math.min(currentPage + 2, pageNumbers.length)
                )
                .map((n) => (
                  <button
                    key={n}
                    onClick={() => paginate(n)}
                    className={`${currentPage === n ? "active" : ""}`}
                  >
                    {n}
                  </button>
                ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
