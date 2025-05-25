
"use client"

import { useRef, ReactNode } from "react";
import LoadingBar, { LoadingBarContainer } from "react-top-loading-bar";

interface Props {
  children: ReactNode;
}

const ClientSideLoadingBar = ({ children }: Props) => {
  const ref = useRef<React.ElementRef<typeof LoadingBar>>(null);

  return (
    <LoadingBarContainer>
      <LoadingBar color="#f11946" ref={ref} />
      {children}
    </LoadingBarContainer>
  );
};

export default ClientSideLoadingBar;


