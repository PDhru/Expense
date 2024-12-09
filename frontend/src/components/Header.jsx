import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate(); // For navigation

  // Logout function
  const handleLogout = () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      navigate("/login"); // Redirect to login page
  };
    return (
        <>
        <nav className="pc-sidebar">
        <div className="navbar-wrapper">
          <div className="m-header flex items-center py-4 px-6 h-header-height"><a href="../dashboard/index.html" className="b-brand flex items-center gap-3">
            <img src="../assets/images/logo-dark.svg" className="img-fluid logo-lg" alt="logo" /> <span className="badge bg-success-500/10 text-success-500 rounded-full theme-version">v1.0.0</span></a>
          </div>
          <div className="navbar-content h-[calc(100vh_-_74px)] py-2.5">
            {/* MAIN SIDEBAR */}
            <ul className="pc-navbar">
              <li className="pc-item pc-caption"><label>Navigation</label></li>
              <li className="pc-item pc-hasmenu"><Link to={"/"} className="pc-link"><span className="pc-mtext">Home</span></Link></li>
              <li className="pc-item"><Link to={"/addexpense"} className="pc-link"><span className="pc-mtext">Add Expenses</span></Link></li>
              <li className="pc-item"><Link to={"/viewexpense"} className="pc-link"><span className="pc-mtext">My Expenses</span></Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="pc-header">
        <div className="header-wrapper flex max-sm:px-[15px] px-[25px] grow">{/* [Mobile Media Block] start */}
          <div className="me-auto pc-mob-drp">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              {/* ======= Menu collapse Icon ===== */}
              <li className="pc-h-item pc-sidebar-collapse max-lg:hidden lg:inline-flex"><a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="sidebar-hide"><i className="ti ti-menu-2" /></a>
              </li>
              <li className="pc-h-item pc-sidebar-popup lg:hidden"><a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="mobile-collapse"><i className="ti ti-menu-2 text-2xl leading-none" /></a></li>
              <li className="pc-h-item max-md:hidden md:inline-flex">
                <form className="form-search relative"><i className="search-icon absolute top-[14px] left-[15px]"><svg className="pc-icon w-4 h-4">
                  <use xlinkHref="#custom-search-normal-1" />
                </svg> </i><input type="search" className="form-control px-2.5 pr-3 pl-10 w-[198px] leading-none" placeholder="Ctrl + K" />
                </form>
              </li>
            </ul>
          </div>{/* [Mobile Media Block end] */}
          <div className="ms-auto">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
            <li>
            <div className="grid "><button className="btn btn-primary flex items-center justify-center" onClick={handleLogout}><svg className="pc-icon me-2 w-[22px] h-[22px]">
                        <use xlinkHref="#custom-logout-1-outline" />
                      </svg> Logout</button></div>
            </li>
              <li className="dropdown pc-h-item header-user-profile"><a className="pc-head-link dropdown-toggle arrow-none me-0" data-pc-toggle="dropdown" href="#" role="button" aria-haspopup="false" data-pc-auto-close="outside" aria-expanded="false"><img src="../assets/images/user/avatar-2.jpg" alt="user-image" className="user-avtar w-10 h-10 rounded-full" /></a>
                <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown p-2">
                  <div className="dropdown-header flex items-center justify-between py-4 px-5">
                    <h5 className="m-0">Profile</h5>
                  </div>
                  <div className="dropdown-body py-4 px-5">
                    <div className="profile-notification-scroll position-relative" style={{ maxHeight: 'calc(100vh - 225px)' }}>
                      <div className="flex mb-1 items-center">
                        <div className="shrink-0"><img src="../assets/images/user/avatar-2.jpg" alt="user-image" className="w-10 rounded-full" /></div>
                        <div className="grow ms-3">
                          <h6 className="mb-1">Carson Darrin 🖖</h6><span><a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="f3909281809c9ddd979281819a9db3909c9e83929d8add9a9c">[email&nbsp;protected]</a></span>
                        </div>
                      </div>
                      <hr className="border-secondary-500/10 my-4" />
                      <div className="card">
                        <div className="card-body !py-4">
                          <div className="flex items-center justify-between">
                            <h5 className="mb-0 inline-flex items-center"><svg className="pc-icon text-muted me-2 w-[22px] h-[22px]">
                              <use xlinkHref="#custom-notification-outline" />
                            </svg> Notification</h5><label className="inline-flex items-center cursor-pointer"><input type="checkbox" defaultValue className="sr-only peer" />
                              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <p className="text-span mb-3">Manage</p><a href="#" className="dropdown-item"><span><svg className="pc-icon text-muted me-2 inline-block">
                        <use xlinkHref="#custom-setting-outline" />
                      </svg> <span>Settings</span> </span></a><a href="#" className="dropdown-item"><span><svg className="pc-icon text-muted me-2 inline-block">
                        <use xlinkHref="#custom-share-bold" />
                      </svg> <span>Share</span> </span></a><a href="#" className="dropdown-item"><span><svg className="pc-icon text-muted me-2 inline-block">
                        <use xlinkHref="#custom-lock-outline" />
                      </svg> <span>Change Password</span></span></a>
                      <hr className="border-secondary-500/10 my-4" />
                      <p className="text-span mb-3">Team</p><a href="#" className="dropdown-item"><span><svg className="pc-icon text-muted me-2 inline-block">
                        <use xlinkHref="#custom-profile-2user-outline" />
                      </svg> <span>UI Design team</span></span>
                        <div dir="ltr" className="flex -space-x-2 overflow-hidden *:flex *:items-center *:justify-center *:rounded-full *:w-[30px] *:h-[30px] hover:*:z-10 *:border *:border-2 *:border-white">
                          <img src="../assets/images/user/avatar-1.jpg" alt="user-image" className="avtar" /> <span className="avtar bg-danger text-white">K</span> <span className="avtar bg-success text-white"><svg className="pc-icon m-0">
                            <use xlinkHref="#custom-user" />
                          </svg> </span><span className="avtar bg-theme-cardbg dark:bg-themedark-cardbg overflow-hidden"><span className="flex items-center justify-center w-full h-full bg-primary-500/10 text-primary-500">+2</span></span>
                        </div>
                      </a><a href="#" className="dropdown-item"><span><svg className="pc-icon text-muted me-2 inline-block">
                        <use xlinkHref="#custom-profile-2user-outline" />
                      </svg> <span>Friends Groups</span></span>
                        <div dir="ltr" className="flex -space-x-2 overflow-hidden *:flex *:items-center *:justify-center *:rounded-full *:w-[30px] *:h-[30px] hover:*:z-10 *:border *:border-2 *:border-white">
                          <img src="../assets/images/user/avatar-1.jpg" alt="user-image" className="avtar" /> <span className="avtar bg-danger text-white">K</span> <span className="avtar bg-success text-white"><svg className="pc-icon m-0">
                            <use xlinkHref="#custom-user" />
                          </svg></span></div>
                      </a><a href="#" className="dropdown-item"><span><svg className="pc-icon text-muted me-2 inline-block">
                        <use xlinkHref="#custom-add-outline" />
                      </svg> <span>Add new</span></span>
                        <div dir="ltr" className="flex -space-x-2 overflow-hidden *:flex *:items-center *:justify-center *:rounded-full *:w-[30px] *:h-[30px] hover:*:z-10 *:border-2 *:border-white">
                          <span className="avtar bg-primary text-white"><svg className="pc-icon m-0">
                            <use xlinkHref="#custom-add-outline" />
                          </svg></span></div>
                      </a>
                      <hr className="border-secondary-500/10 my-4" />
                      <div className="grid mb-3"><button className="btn btn-primary flex items-center justify-center"><svg className="pc-icon me-2 w-[22px] h-[22px]">
                        <use xlinkHref="#custom-logout-1-outline" />
                      </svg> Logout</button></div>
                      <div className="card border-0 shadow-none drp-upgrade-card mb-0 bg-cover" style={{ backgroundImage: 'url(../assets/images/layout/img-profile-card.jpg)' }}>
                        <div className="card-body">
                          <div className="flex -space-x-3 overflow-hidden *:flex *:items-center *:justify-center *:rounded-full *:w-10 *:h-10 hover:*:z-10 *:border-2 *:border-white">
                            <img src="../assets/images/user/avatar-1.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-2.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-3.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-4.jpg" alt="user-image" className="avtar" /> <img src="../assets/images/user/avatar-5.jpg" alt="user-image" className="avtar" /> <span className="avtar bg-theme-cardbg dark:bg-themedark-cardbg overflow-hidden"><span className="flex items-center justify-center w-full h-full bg-primary-500/10 text-primary-500">+20</span></span>
                          </div>
                          <h3 className="my-4 text-dark">245.3k <small className="text-muted">Followers</small></h3>
                          <div className="btn btn-warning inline-flex items-center justify-center"><svg className="pc-icon me-2 w-[22px] h-[22px]">
                            <use xlinkHref="#custom-logout-1-outline" />
                          </svg> Upgrade to Business</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      </>
    )
}

export default Header