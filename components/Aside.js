import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { BsPostcard } from "react-icons/bs";
import { GrProjects } from "react-icons/gr";
import { CgShoppingCart } from "react-icons/cg";
import { GrGallery } from "react-icons/gr";
import { MdOutlineContacts } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import LoginLayout from "./LoginLayout";
import { signOut } from "next-auth/react";

const Aside = ({ asideOpen, handleAsideOpen }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handlClick = () => {
    setClicked(!clicked);
  };

  const handlLinkClick = (link) => {
    setActiveLink((prevActive) => (prevActive === link ? null : link));
    setClicked(false);
  };

  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <LoginLayout>
      <>
        <aside className={asideOpen ? "asideleft active" : "asideleft"}>
          <ul>
            <Link href="/">
              <li className="navactive">
                <FaHome />
                <span>Dashboard</span>
              </li>
            </Link>
            {/* blogs */}
            <li
              className={
                activeLink === "/blogs"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handlLinkClick("/blogs")}
            >
              <div className="flex gap-1">
                <BsPostcard />
                <span>Blogs</span>
              </div>
              {activeLink === "/blogs" && (
                <ul>
                  <Link href="/blogs">
                    <li>All Blogs</li>
                  </Link>
                  <Link href="/blogs/draft">
                    <li>Draft Blogs</li>
                  </Link>
                  <Link href="/blogs/addblog">
                    <li>Add Blog</li>
                  </Link>
                </ul>
              )}
            </li>

            {/* projects */}

            <li
              className={
                activeLink === "/projects"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handlLinkClick("/projects")}
            >
              <div className="flex gap-1">
                <GrProjects />
                <span>Projects</span>
              </div>
              {activeLink === "/projects" && (
                <ul>
                  <Link href="/projects">
                    <li>All Projects</li>
                  </Link>
                  <Link href="/projects/draftprojects">
                    <li>Draft Project</li>
                  </Link>
                  <Link href="/projects/addproject">
                    <li>Add Project</li>
                  </Link>
                </ul>
              )}
            </li>
            {/* shops */}

            <li
              className={
                activeLink === "/shops"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handlLinkClick("/shops")}
            >
              <div className="flex gap-1">
                <CgShoppingCart />
                <span>Shops</span>
              </div>
              {activeLink === "/shops" && (
                <ul>
                  <Link href="/shops">
                    <li>All Products</li>
                  </Link>
                  <Link href="/shops/draftshop">
                    <li>Draft Shop</li>
                  </Link>
                  <Link href="/shops/addproduct">
                    <li>Add Product</li>
                  </Link>
                </ul>
              )}
            </li>
            {/* gallery */}

            <li
              className={
                activeLink === "/gallery"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handlLinkClick("/gallery")}
            >
              <div className="flex gap-1">
                <GrGallery />
                <span>Gallery</span>
              </div>
              {activeLink === "/gallery" && (
                <ul>
                  <Link href="/gallery">
                    <li>All Photos</li>
                  </Link>
                  <Link href="/gallery/addphoto">
                    <li>Add Photo</li>
                  </Link>
                </ul>
              )}
            </li>

            {/* contact */}
            <Link href="/contacts">
              <li
                className={activeLink === "/contacts" ? "navactive" : ""}
                onClick={() => handlLinkClick("/contacts")}
              >
                <MdOutlineContacts />
                <span>Contacts</span>
              </li>
            </Link>
            {/* Settings */}
            <Link href="/setting">
              <li
                className={activeLink === "/setting" ? "navactive" : ""}
                onClick={() => handlLinkClick("/setting")}
              >
                <IoSettingsOutline />
                <span>Setting</span>
              </li>
            </Link>
          </ul>
            <button className="logoutbtn"
            onClick={() => signOut()}
            >Logout</button>
        </aside>
      </>
    </LoginLayout>
  );
};

export default Aside;
