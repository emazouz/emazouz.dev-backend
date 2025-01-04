import { RiBarChartHorizontalLine } from "react-icons/ri";
import { RxExitFullScreen } from "react-icons/rx";
import { GoScreenFull } from "react-icons/go";
import { useState } from "react";
import LoginLayout from "./LoginLayout";
function Header({ handleAsideOpen }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  return (
    <LoginLayout>
      <>
        <header className="header flex flex-sb">
          <div className="logo flex gap-2">
            <h1>Adim</h1>
            <div
              className="headerham flex flex-center"
              onClick={handleAsideOpen}
            >
              <RiBarChartHorizontalLine />
            </div>
          </div>
          <div className="rightnav flex gap-2">
            <div onClick={toggleFullScreen}>
              {isFullScreen ? <RxExitFullScreen /> : <GoScreenFull />}
            </div>
            <div className="notification">
              <img src="/img/notification.png" alt="notification" />
            </div>
            <div className="profilenav">
              <img src="/img/user.png" alt="user" />
            </div>
          </div>
        </header>
      </>
    </LoginLayout>
  );
}

export default Header;
