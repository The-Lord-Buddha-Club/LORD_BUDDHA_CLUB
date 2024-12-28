"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Key, ChevronRight } from 'lucide-react';

export function ProfileSecurity() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const toggleTwoFA = () => {
    // Here you would typically make an API call to enable/disable 2FA
    setTwoFAEnabled(!twoFAEnabled);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-background to-background/80 border border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 pb-6">
          <CardTitle className="text-2xl font-bold text-primary">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <motion.div
            className="flex items-center justify-between"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-primary">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <Button
              variant={twoFAEnabled ? "outline" : "default"}
              onClick={toggleTwoFA}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">
                {twoFAEnabled ? "Disable" : "Enable"}
              </span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-primary">Access Tokens</p>
                <p className="text-sm text-muted-foreground">
                  Manage your API tokens
                </p>
              </div>
            </div>
            <Button variant="outline" className="group">
              Manage
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

