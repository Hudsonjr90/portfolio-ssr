'use client'

import { useState, useEffect } from "react";
import { useResponsiveNavbar } from "@/hooks/useResponsiveNavbar";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaMoon, FaSun } from "react-icons/fa6";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { IoSparkles } from "react-icons/io5";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import { logoTheme, navbarTheme, useTheme } from "@/context/ThemeContext";
import { useParticles } from "@/context/ParticlesContext";
import { ThemeProvider } from "@mui/material/styles";
import { useAudio } from "@/hooks/useAudio";
import { Us, Fr, Br, Es, It } from "react-flags-select";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import logoDark from "../../../public/imgs/hkdev.webp";
import logoLight from "../../../public/imgs/hkdev_light.webp";
import TourButton from "../TourButton/TourButton";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { handleAudio, toggleSound, soundEnabled } = useAudio();
  const pathname = usePathname();
  const { setMainColor } = useTheme();
  const { particlesEnabled, toggleParticles } = useParticles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightMode, setLightMode] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("pt");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { handleClickButton, handleLinkClick, showMenu } =
    useResponsiveNavbar();

  const handleToggleLightMode = () => {
    const newLightMode = !lightMode;
    setLightMode(newLightMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem("lightMode", JSON.stringify(newLightMode));
    }
    setMainColor(newLightMode ? "#f65151" : "#0ef6cc");
  };

  useEffect(() => {
    document.body.classList.toggle("light_mode", lightMode);
    // Sincroniza a cor principal com o tema atual
    setMainColor(lightMode ? "#f65151" : "#0ef6cc");
  }, [lightMode, setMainColor]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    if (typeof window !== 'undefined') {
      localStorage.setItem("currentLanguage", lng);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [currentLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem("currentLanguage") || "pt";
      const savedLightMode = localStorage.getItem("lightMode");
      const isLightMode = savedLightMode ? JSON.parse(savedLightMode) : false;
      
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);
      setLightMode(isLightMode);
    }
  }, [i18n]);

  // Efeito de carregamento para animação sequencial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={styles.header} data-tour="navbar">
      <motion.div
        className={styles.logo}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        <ThemeProvider theme={logoTheme}>
          <Link href="/" onClick={handleAudio}>
            <Tooltip title={t("menu.home")} placement="right" arrow>
              <img
                src={lightMode ? logoLight.src : logoDark.src}
                alt="Logo"
                width="80"
                height="80"
                loading="eager"
                className={styles.logo_img}
                aria-label={t("menu.home")}
              />
            </Tooltip>
          </Link>
        </ThemeProvider>
      </motion.div>

      <nav>
        <motion.ul
          className={`${styles.links_list} ${showMenu ? styles.active : ""}`}
          role="menu"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 0 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <Link
              href="/about"
              className={pathname === '/about' ? styles.active : ""}
              role="menuitem"
            >
              {t("menu.about")}
            </Link>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 1 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <Link
              href="/education"
              className={pathname === '/education' ? styles.active : ""}
              role="menuitem"
            >
              {t("menu.education")}
            </Link>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 2 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <Link
              href="/testimonials"
              className={pathname === '/testimonials' ? styles.active : ""}
              role="menuitem"
            >
              {t("menu.testimonials")}
            </Link>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 3 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <Link
              href="/experiences"
              className={pathname === '/experiences' ? styles.active : ""}
              role="menuitem"
            >
              {t("menu.experiences")}
            </Link>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 4 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <Link
              href="/skills"
              className={pathname === '/skills' ? styles.active : ""}
              role="menuitem"
            >
              {t("menu.skills")}
            </Link>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 5 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <Link
              href="/portfolio"
              className={pathname === '/portfolio' ? styles.active : ""}
              role="menuitem"
            >
              {t("menu.portfolio")}
            </Link>
          </motion.li>
          {/* <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 6 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.contact")}
            </NavLink>
          </motion.li> */}
        </motion.ul>
      </nav>

      <motion.div
        className={styles.icons_container}
        id="container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
      >
        <ThemeProvider theme={navbarTheme}>
          <TourButton currentPage={pathname === '/' ? 'home' : pathname.slice(1)} />

          <Tooltip title={t("navbar.sound")} placement="bottom" arrow>
            <button
              onClick={toggleSound}
              className={styles.sound_icon}
              aria-label="Toggle Sound"
              data-tour="sound-toggle"
            >
              {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
          </Tooltip>

          <Tooltip title={t("navbar.effect")} placement="bottom" arrow>
            <button
              onClick={() => {
                toggleParticles();
                handleAudio();
              }}
              className={styles.particles_icon}
              aria-label="Toggle Particles"
              data-tour="particles-toggle"
            >
              {particlesEnabled ? <HiSparkles /> : <IoSparkles />}
            </button>
          </Tooltip>

          <Tooltip title={t("navbar.theme")} placement="bottom" arrow>
            <label className={styles.theme_toggle_label} data-tour="theme-toggle">
              <input
                type="checkbox"
                checked={lightMode}
                className={styles.input_dark_light_mode}
                onChange={() => {
                  handleToggleLightMode();
                  handleAudio();
                }}
                aria-label="Alternar modo claro/escuro"
                role="switch"
              />
              <FaMoon className={styles.moon_icon} />
              <FaSun className={styles.sun_icon} />
            </label>
          </Tooltip>

          <Tooltip title={t("navbar.language")} placement="right" arrow>
            <div className={styles.lng_box} data-tour="language-toggle">
              <div className={styles.slide}>
                <button
                  className={styles.lng_btn}
                  onClick={() => {
                    toggleSidebar();
                    handleAudio();
                  }}
                  aria-label="Selecionar idioma"
                >
                  {currentLanguage === "pt" && (
                    <>
                      <Br className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "en" && (
                    <>
                      <Us className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "fr" && (
                    <>
                      <Fr className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "it" && (
                    <>
                      <It className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "es" && (
                    <>
                      <Es className={styles.flags} />
                    </>
                  )}
                </button>
                {sidebarOpen && (
                  <motion.div
                    className={styles.sidebar}
                    initial={{ x: "80%" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    <button
                      onClick={() => {
                        changeLanguage("pt");
                        handleAudio();
                      }}
                    >
                      <div className={styles.flags_name}>
                        <Br className={styles.flags} />
                        <span>{t("name.br")}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("en");
                        handleAudio();
                      }}
                    >
                      <div className={styles.flags_name}>
                        <Us className={styles.flags} />
                        <span>{t("name.us")}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("fr");
                        handleAudio();
                      }}
                    >
                      <div className={styles.flags_name}>
                        <Fr className={styles.flags} />
                        <span>{t("name.fr")}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("it");
                        handleAudio();
                      }}
                    >
                      <div className={styles.flags_name}>
                        <It className={styles.flags} />
                        <span>{t("name.it")}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("es");
                        handleAudio();
                      }}
                    >
                      <div className={styles.flags_name}>
                        <Es className={styles.flags} />
                        <span>{t("name.es")}</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </Tooltip>

          <Tooltip title={t("menu.home")} placement="bottom" arrow>
            <button
              onClick={() => {
                handleClickButton();
                handleAudio();
              }}
              className={`${styles.btn_menu} ${showMenu ? styles.active : ""}`}
              role="button"
              aria-label="Menu"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </Tooltip>
        </ThemeProvider>
      </motion.div>
    </header>
  );
};

export default Navbar;
