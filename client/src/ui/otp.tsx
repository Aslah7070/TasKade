
"use client";
import { SetState } from "@/types/type";
import { Box, Button, Modal, CircularProgress } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React, { useEffect } from "react";

type Props = {
  open: boolean;
  otp: string;
  spinning?: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
  onVerify: () => void;
  resendOtp:()=>void
  setTimer:SetState<number>
  timer:number
};

const OtpModal = ({ open,setTimer,timer, otp, spinning = false, onClose, onChange, onVerify,resendOtp }: Props) => {

     useEffect(() => {
        let interval: NodeJS.Timeout;
    
        if (open && timer > 0) {
          interval = setInterval(() => {
            setTimer((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
    
        return () => clearInterval(interval);
      }, [open, setTimer, timer]);
      const formattedTime = `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`;
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#000",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
          width: 400,
          height: 250,
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          color: "white",
        }}
      >
        <MuiOtpInput
          value={otp}
          onChange={onChange}
          length={4}
          TextFieldsProps={{
            sx: { width: 50, backgroundColor: "white", borderRadius: 1 },
          }}
        />
        <Button variant="contained" onClick={onVerify} disabled={spinning}>
          {spinning ? <CircularProgress size={20} /> : "Verify OTP"}
        </Button>
     <Box sx={{ fontSize: '0.8rem' }}>
          {timer > 0 ? (
            <>Resend in <strong>{formattedTime}</strong></>
          ) : (
            <>
              Didn’t receive the code?{' '}
              <span
                style={{ color: '#90caf9', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={resendOtp}
              >
                Resend
              </span>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default OtpModal;
