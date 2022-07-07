import React, {useState} from "react";
import "./NavBar.css"
import {Link} from "react-router-dom";

type Props = {
  activeItem: "home" | "transaction" | "setting"
}

export function NavBar({activeItem}: Props): JSX.Element {

  const itemClasses = "d-flex flex-column align-items-center text-black py-3"
  const [active, setActive] = useState<string>("home")

  const changeNavActive = (activeLink: string) => {
    setActive(activeLink)
  }

  return (
    <div className="d-flex justify-content-around align-items-center w-100 bg-white nav-bar">

      <Link to="/home" style={{textDecoration: "none"}}>
        <div className={active === "home" ? "active-link " + itemClasses : itemClasses}
             onClick={() => changeNavActive("home")}>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.7606 1.58227C12.3575 0.366934 14.6022 0.31102 16.2574 1.41892L16.461 1.56206L24.1631 7.37454C25.0105 7.99375 25.5324 8.91623 25.6247 9.92177L25.6382 10.1627L25.6764 19.8843C25.6862 22.39 23.612 24.4355 21.0032 24.5766L18.4936 24.5855C17.2941 24.5669 16.3208 23.6832 16.2281 22.5686L16.2149 22.3996L16.2014 18.972C16.2 18.5992 15.9074 18.2897 15.5175 18.2299L15.4039 18.2184L12.0354 18.2303C11.6332 18.2437 11.3063 18.5206 11.2573 18.8805L11.2451 18.9896L11.2585 22.4064C11.2588 22.4771 11.2452 22.5611 11.2341 22.6211L11.2216 22.6463L11.2081 22.7291C11.062 23.7498 10.1822 24.531 9.08532 24.608L8.92142 24.6194L6.66396 24.6274C4.02818 24.6368 1.8639 22.6795 1.71548 20.2091L1.67639 10.2477C1.68374 9.22739 2.14791 8.27862 2.92724 7.61647L10.7606 1.58227ZM15.3689 2.87271C14.4076 2.14481 13.0454 2.11487 12.039 2.75265L11.8491 2.8852L4.20435 8.78806C3.76541 9.10011 3.50241 9.56862 3.4413 10.0604L3.42817 10.2522L3.46628 19.9631C3.47254 21.5576 4.78925 22.8597 6.45561 22.9497L8.91484 22.941C9.19229 22.94 9.4312 22.7605 9.4668 22.5086L9.49244 22.2927L9.5048 22.2316L9.49212 18.9958C9.48707 17.713 10.5171 16.6663 11.841 16.5645L15.3974 16.5519C16.7455 16.5471 17.8466 17.5275 17.9537 18.786L17.9679 22.3934C17.9689 22.6451 18.1589 22.8615 18.4113 22.9073L20.7558 22.899C22.4457 22.893 23.8155 21.6545 23.9102 20.0824L23.9233 19.8906L23.8853 10.1797C23.8694 9.66545 23.6417 9.1855 23.2494 8.82843L23.0849 8.69594L15.3689 2.87271Z"/>
          </svg>
          <span>Accueil</span>
        </div>
      </Link>

      <Link to="/transaction" style={{textDecoration: "none"}}>
        <div className={active === "transaction" ? "active-link " + itemClasses : itemClasses}
             onClick={() => changeNavActive("transaction")}>
          <svg width="33" height="32" viewBox="0 0 33 32" fill="#565656" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.1667 2.66663H13.8333C12.7725 2.66663 11.7551 3.08805 11.0049 3.8382C10.2548 4.58834 9.83334 5.60576 9.83334 6.66663V16C9.83334 17.0608 10.2548 18.0782 11.0049 18.8284C11.7551 19.5785 12.7725 20 13.8333 20H27.1667C28.2275 20 29.245 19.5785 29.9951 18.8284C30.7453 18.0782 31.1667 17.0608 31.1667 16V6.66663C31.1667 5.60576 30.7453 4.58834 29.9951 3.8382C29.245 3.08805 28.2275 2.66663 27.1667 2.66663ZM28.5 16C28.5 16.3536 28.3595 16.6927 28.1095 16.9428C27.8594 17.1928 27.5203 17.3333 27.1667 17.3333H13.8333C13.4797 17.3333 13.1406 17.1928 12.8905 16.9428C12.6405 16.6927 12.5 16.3536 12.5 16V6.66663C12.5 6.313 12.6405 5.97387 12.8905 5.72382C13.1406 5.47377 13.4797 5.33329 13.8333 5.33329H27.1667C27.5203 5.33329 27.8594 5.47377 28.1095 5.72382C28.3595 5.97387 28.5 6.313 28.5 6.66663V16ZM23.8333 10.6666C23.3397 10.6683 22.8644 10.8537 22.5 11.1866C22.2133 10.926 21.8571 10.7543 21.4746 10.6924C21.0921 10.6304 20.6999 10.6809 20.3456 10.8376C19.9913 10.9944 19.6901 11.2507 19.4787 11.5754C19.2673 11.9001 19.1548 12.2792 19.1548 12.6666C19.1548 13.0541 19.2673 13.4332 19.4787 13.7579C19.6901 14.0826 19.9913 14.3389 20.3456 14.4956C20.6999 14.6524 21.0921 14.7028 21.4746 14.6409C21.8571 14.5789 22.2133 14.4072 22.5 14.1466C22.7408 14.3655 23.0313 14.5223 23.3464 14.6034C23.6615 14.6845 23.9916 14.6876 24.3082 14.6123C24.6247 14.5369 24.9181 14.3855 25.1628 14.1712C25.4076 13.9568 25.5964 13.686 25.7128 13.3822C25.8292 13.0783 25.8697 12.7507 25.8309 12.4276C25.792 12.1046 25.6749 11.7959 25.4897 11.5284C25.3046 11.2608 25.0569 11.0425 24.7683 10.8924C24.4796 10.7422 24.1587 10.6647 23.8333 10.6666ZM21.8333 22.6666C21.4797 22.6666 21.1406 22.8071 20.8905 23.0571C20.6405 23.3072 20.5 23.6463 20.5 24V25.3333C20.5 25.6869 20.3595 26.0261 20.1095 26.2761C19.8594 26.5261 19.5203 26.6666 19.1667 26.6666H5.83334C5.47972 26.6666 5.14058 26.5261 4.89053 26.2761C4.64049 26.0261 4.50001 25.6869 4.50001 25.3333V20H5.83334C6.18697 20 6.5261 19.8595 6.77615 19.6094C7.0262 19.3594 7.16668 19.0202 7.16668 18.6666C7.16668 18.313 7.0262 17.9739 6.77615 17.7238C6.5261 17.4738 6.18697 17.3333 5.83334 17.3333H4.50001V16C4.50001 15.6463 4.64049 15.3072 4.89053 15.0571C5.14058 14.8071 5.47972 14.6666 5.83334 14.6666C6.18697 14.6666 6.5261 14.5261 6.77615 14.2761C7.0262 14.0261 7.16668 13.6869 7.16668 13.3333C7.16668 12.9797 7.0262 12.6405 6.77615 12.3905C6.5261 12.1404 6.18697 12 5.83334 12C4.77248 12 3.75506 12.4214 3.00492 13.1715C2.25477 13.9217 1.83334 14.9391 1.83334 16V25.3333C1.83334 26.3942 2.25477 27.4116 3.00492 28.1617C3.75506 28.9119 4.77248 29.3333 5.83334 29.3333H19.1667C20.2275 29.3333 21.245 28.9119 21.9951 28.1617C22.7453 27.4116 23.1667 26.3942 23.1667 25.3333V24C23.1667 23.6463 23.0262 23.3072 22.7762 23.0571C22.5261 22.8071 22.187 22.6666 21.8333 22.6666ZM8.50001 24H9.83334C10.187 24 10.5261 23.8595 10.7762 23.6094C11.0262 23.3594 11.1667 23.0202 11.1667 22.6666C11.1667 22.313 11.0262 21.9739 10.7762 21.7238C10.5261 21.4738 10.187 21.3333 9.83334 21.3333H8.50001C8.14639 21.3333 7.80725 21.4738 7.5572 21.7238C7.30715 21.9739 7.16668 22.313 7.16668 22.6666C7.16668 23.0202 7.30715 23.3594 7.5572 23.6094C7.80725 23.8595 8.14639 24 8.50001 24Z"/>
          </svg>
          <span>Transaction</span>
        </div>
      </Link>

      <div className={active === "setting" ? "active-link " + itemClasses : itemClasses}
           onClick={() => changeNavActive("setting")}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="#565656" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.7286 4.00003C17.6232 3.99651 18.4812 4.33048 19.1071 4.92585C19.733 5.5212 20.0735 6.32727 20.0493 7.08076L20.0608 7.25791C20.0832 7.43233 20.1448 7.6005 20.2443 7.75538C20.4382 8.06078 20.7545 8.28177 21.1235 8.36963C21.4926 8.4575 21.884 8.40502 22.254 8.20156L22.4603 8.10138C24.0096 7.41622 25.873 7.94973 26.7393 9.33846L27.5179 10.5864C27.5384 10.6193 27.5565 10.6533 27.5722 10.6882L27.6445 10.8219C28.3419 12.1952 27.8559 13.8335 26.5446 14.6696L26.2207 14.8608C26.0514 14.9716 25.9105 15.1161 25.8047 15.2895C25.6138 15.5974 25.5625 15.9636 25.6622 16.3069C25.7619 16.6501 26.0044 16.9422 26.3713 17.1381L26.5824 17.2631C27.2204 17.6754 27.6824 18.285 27.8857 18.9847C28.115 19.7742 27.997 20.6164 27.5517 21.3343L26.7245 22.6289L26.5998 22.8115C25.627 24.1249 23.7299 24.5319 22.2779 23.7579L22.1059 23.6761C21.9265 23.6021 21.733 23.5618 21.557 23.5578C21.1742 23.5575 20.8071 23.6997 20.5374 23.9528C20.2678 24.2059 20.1179 24.5489 20.1204 24.9471L20.111 25.1531C19.9771 26.7479 18.5493 27.9883 16.8231 27.9944L15.2644 28C13.4362 28.0063 11.9488 26.6311 11.9442 24.9828L11.9328 24.8056C11.9103 24.6312 11.8487 24.463 11.7442 24.3001C11.5545 23.9939 11.2414 23.771 10.8745 23.6809C10.5075 23.5909 10.1171 23.641 9.73988 23.846L9.51565 23.9513C8.80643 24.2515 8.00533 24.3093 7.25371 24.1131C6.40569 23.8919 5.68734 23.3649 5.2666 22.6634L4.45736 21.3728L4.34958 21.1815C3.61161 19.7441 4.17885 18.0109 5.63265 17.2214L5.76521 17.1434C6.15344 16.8911 6.38519 16.4765 6.38345 16.0341C6.38155 15.5529 6.10427 15.1093 5.62125 14.8508L5.42522 14.7347C4.01544 13.8287 3.57885 12.0615 4.44445 10.6505L5.25878 9.39351C6.16412 7.91715 8.1813 7.4018 9.73752 8.22595L9.90597 8.30884C10.0776 8.38152 10.264 8.41975 10.4432 8.42089C11.2336 8.41815 11.8752 7.82462 11.8842 7.06671L11.894 6.83392C11.9559 6.1131 12.2889 5.43471 12.8356 4.91913C13.4524 4.33743 14.2926 4.00867 15.1702 4.00555L16.7286 4.00003ZM16.7358 5.7369L15.1771 5.74242C14.7955 5.7438 14.4301 5.88674 14.1619 6.13966C13.9243 6.3638 13.7795 6.65879 13.7549 6.93387L13.7394 7.29971C13.6151 8.89503 12.1896 10.1518 10.4402 10.1578C9.98929 10.155 9.54435 10.0637 9.09027 9.87014L8.84707 9.75175C8.15406 9.38504 7.27308 9.6101 6.86646 10.2727L6.05212 11.5297C5.6791 12.1379 5.86988 12.9102 6.45261 13.2855L6.78234 13.4784C7.69054 14.0459 8.24388 14.9992 8.24792 16.0275C8.25191 17.0407 7.72136 17.9897 6.80016 18.5876L6.60402 18.7034C5.9583 19.0544 5.71153 19.8084 6.01461 20.4004L6.08615 20.528L6.88511 21.8011C7.07276 22.1138 7.38649 22.344 7.75686 22.4406C8.08512 22.5263 8.43502 22.501 8.70759 22.3866L8.84453 22.3235C9.60016 21.9092 10.5021 21.7933 11.3499 22.0014C12.1977 22.2095 12.921 22.7245 13.3516 23.4199C13.5832 23.7804 13.7304 24.182 13.7886 24.6441L13.8157 25.0682C13.8968 25.7426 14.5124 26.2657 15.2575 26.263L16.8162 26.2575C17.5699 26.2548 18.1939 25.7128 18.2501 25.0513L18.2567 24.9205C18.2492 24.1003 18.594 23.3114 19.2142 22.7293C19.8345 22.1471 20.6788 21.8201 21.5796 21.8212C22.0216 21.8306 22.457 21.9213 22.9024 22.1062L23.3018 22.2945C23.9286 22.5481 24.6701 22.3588 25.0443 21.8546L25.1353 21.7211L25.9434 20.456C26.1343 20.1481 26.1856 19.7819 26.0859 19.4387C25.9976 19.1344 25.7967 18.8694 25.5537 18.7113L25.2093 18.5102C24.5508 18.0989 24.0709 17.4785 23.8624 16.7608C23.6331 15.9713 23.7511 15.1291 24.1869 14.4264C24.4254 14.0351 24.754 13.6982 25.1831 13.4183L25.3854 13.2986C26.0301 12.9443 26.2767 12.1904 25.9758 11.5961L25.886 11.4363L25.8698 11.4027L25.1272 10.2114C24.776 9.64834 24.0489 9.4071 23.4334 9.60194L23.2936 9.65467L23.1637 9.71692C22.4105 10.1338 21.5103 10.2545 20.6616 10.0524C19.8129 9.85035 19.0853 9.34208 18.642 8.64362C18.4104 8.28317 18.2632 7.88153 18.205 7.41948L18.1872 7.11716C18.197 6.7533 18.0483 6.40125 17.7749 6.14123C17.5016 5.88122 17.1268 5.73553 16.7358 5.7369ZM15.987 12.0791C18.3115 12.0708 20.2028 13.8196 20.2113 15.985C20.2198 18.1505 18.3423 19.9126 16.0177 19.9209C13.6932 19.9291 11.8019 18.1803 11.7934 16.0149C11.7849 13.8494 13.6624 12.0873 15.987 12.0791ZM15.9938 13.8159C14.699 13.8205 13.6532 14.8021 13.6579 16.0083C13.6626 17.2145 14.7161 18.1886 16.0109 18.184C17.3057 18.1794 18.3515 17.1978 18.3468 15.9916C18.3421 14.7854 17.2886 13.8113 15.9938 13.8159Z"/>
        </svg>
        <span>Parametre</span>
      </div>
    </div>
  );
}
