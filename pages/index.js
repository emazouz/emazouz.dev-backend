import Head from "next/head";
import { Bar } from "react-chartjs-2";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import LoginLayout from "@/components/LoginLayout";

export default function Home() {
  ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [blogData, setBlogData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, projectsRes, photosRes, shopsRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/projects"),
          fetch("/api/photos"),
          fetch("/api/shops"),
        ]);

        setBlogData(await blogsRes.json());
        setProjectData(await projectsRes.json());
        setPhotosData(await photosRes.json());
        setShopData(await shopsRes.json());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const monthlyData = blogData
    .filter((dat) => dat.status === "publish" && dat.createdAt)
    .reduce((acc, blog) => {
      const date = new Date(blog.createdAt);
      if (isNaN(date.getTime())) return acc;
      const year = date.getFullYear();
      const month = date.getMonth();
      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const years = Object.keys(monthlyData);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const predefinedColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
  ];

  const datasets = years.map((year, index) => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: predefinedColors[index % predefinedColors.length],
  }));

  const data = { labels, datasets };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Blogs Created Monthly by Year" },
    },
  };

  return (
    <>
    <LoginLayout >/
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Home<span>Dashboard</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome />
            <span>/</span>
            <span>Dashboard</span>
          </div>
        </div>
        {/* Dashboard four cards */}
        <div className="topfourcards flex flex-sb">
          {/* first card */}
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>
              {blogData.filter((dat) => dat.status === "publish").length}
            </span>
          </div>

          {/* second card */}
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>
              {projectData.filter((dat) => dat.status === "publish").length}
            </span>
          </div>

          {/* three card */}
          <div className="four_card">
            <h2>Total Products</h2>
            <span>
              {shopData.filter((dat) => dat.status === "publish").length}
            </span>
          </div>

          {/* four card */}
          <div className="four_card">
            <h2>Gallery Photos</h2>
            <span>
              {photosData.length}
            </span>
          </div>
        </div>

        {/* year overview */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {blogData.filter((dat) => dat.status === "publish").length} /
                365 <br /> <span>Total Published</span>
              </h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          <div className="right_salescont">
            <div>
              <h3>Blos by Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            {/* blog category */}
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Topics</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  {/* one */}
                  <tr>
                    <td>Next Js</td>
                    <td>
                      {
                        blogData.filter(
                          (dat) => dat.blogCategory[0] === "Next Js"
                        ).length
                      }
                    </td>
                  </tr>
                  {/* two */}
                  <tr>
                    <td>Css</td>
                    <td>
                      {
                        blogData.filter((dat) => dat.blogCategory[0] === "Css")
                          .length
                      }
                    </td>
                  </tr>
                  {/* three */}
                  <tr>
                    <td>Node Js</td>
                    <td>
                      {
                        blogData.filter(
                          (dat) => dat.blogCategory[0] === "Node Js"
                        ).length
                      }
                    </td>
                  </tr>
                  {/* four */}
                  <tr>
                    <td>Flutter Dev</td>
                    <td>
                      {
                        blogData.filter(
                          (dat) => dat.blogCategory[0] === "Flutter Dev"
                        ).length
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
    </>
  );
}
