import { ChevronRight } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.small.png";

const SidebarHeaderComponent = styled("div")(({ theme }) => ({
  color: theme.palette.neutral.contrastText,
  display: "flex",
  position: "relative",
  alignItems: "center",
  justifyContent: "flex-start",
  "& .logo": {
    width: theme.spacing(2.1),
    margin: `0 ${theme.spacing(0.8)}`,
  },
  "& .MuiTypography-root": {
    paddingLeft: theme.spacing(0.5),
    display: "inline-block",
    fontSize: `1.8rem`,
    fontWeight: "600",
  },
}));

const ShrinkButton = styled("span")(
  ({ theme }) =>
    (props: { isHovered: boolean; open: boolean; shrinking: boolean }) => ({
      position: "absolute",
      top: "50%",
      height: "27px",
      padding: `0 ${theme.spacing(0.3)}`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: "6px",
      cursor: "pointer",
      boxShadow: "0 3px 10px -3px rgba(70, 46, 118, 0.3)",
      right: theme.spacing(-2.65),
      transform: "translateY(-50%) translateX(-8px)",
      transition: "0.3s",
      opacity: "0",
      PointerEvent: "none",
      "& svg": {
        height: "27px",
        transition: "0.3s",
        padding: "0",
        width: "18px",
        ...(props.open && {
          transform: "rotate(-180deg)",
        }),
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      ...(props.shrinking && {
        transform: "translateY(-50%) translateX(0px)",
        opacity: "1",
        pointerEvents: "all",
      }),
    })
);

interface SidebarHeaderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHovered: boolean;
  textShrinking: boolean;
  setTextShrinking: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { open, setOpen, isHovered, textShrinking, setTextShrinking } = props;
  const [shrinking, setShrinking] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShrinking(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [open, shrinking]);

  return (
    <SidebarHeaderComponent>
      <ShrinkButton
        className="shrink-button"
        onClick={(e) => {
          setOpen(!open);
          setShrinking(true);
          setTextShrinking(true);
        }}
        isHovered={isHovered}
        open={open}
        shrinking={shrinking}
      >
        <ChevronRight />
      </ShrinkButton>
      <img className="logo" src={logo} alt="logo-img" />
      {/* <Logo className='logo' /> */}
      {open && !textShrinking && (
        <Typography fontWeight={300} fontSize={12} variant="h4" component="h4">
          ReconFace
        </Typography>
      )}
    </SidebarHeaderComponent>
  );
};

export default SidebarHeader;
