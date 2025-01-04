import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // عدد العناصر في كل صفحة
  const [searchQuery, setSearchQuery] = useState(""); // بحث
  const { allData, loading } = useFetchData("/api/projects");

  // تصفية المشاريع بناءً على البحث والحالة "publish"
  const filteredProjects =
    searchQuery.trim() === ""
      ? allData || []
      : allData.filter((project) =>
          project.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
  const publishedProjects = filteredProjects.filter(
    (project) => project.status === "publish"
  );

  // تقسيم المشاريع
  const pageCount = Math.ceil(publishedProjects.length / itemsPerPage);
  const indexOfFirstProject = (currentPage - 1) * itemsPerPage;
  const indexOfLastProject = currentPage * itemsPerPage;
  const currentProjects = publishedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="addblogspage">
        {/* العنوان */}
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Home<span>Projects</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <GrProjects />
            <span>/</span>
            <span>Projects</span>
          </div>
        </div>

        {/* جدول المشاريع */}
        <div className="blogstable">
          {/* البحث */}
          <div className="flex gap-2 mb-1">
            <h2>Search Projects</h2>
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
              ) : currentProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No Projects Found
                  </td>
                </tr>
              ) : (
                currentProjects.map((project, index) => (
                  <tr key={project._id}>
                    <td>{indexOfFirstProject + index + 1}</td>
                    <td>
                      <img
                        src={project.images[0] || "/placeholder.jpg"}
                        alt={project.title}
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                    </td>
                    <td>{project.title}</td>
                    <td>
                      <div className="flex flex-center gap-2">
                        <Link href={`/projects/edit/${project._id}`}>
                          <button>
                            <FaEdit />
                          </button>
                        </Link>
                        <Link href={`/projects/delete/${project._id}`}>
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

          {/* التصفح */}
          {publishedProjects.length === 0 ? (
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
