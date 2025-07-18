"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Palette, User2 } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { ThemeSwitch } from "@/components/theme-switch";

export const Settings = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark themes
              </p>
            </div>
            <ThemeSwitch />
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User2 className="w-5 h-5" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium">Log Out</h4>
            <p className="text-sm text-muted-foreground">
              Log out of your account
            </p>
            <Button className="w-full mt-4" asChild>
              <LogoutLink>Log Out</LogoutLink>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium">Export Data</h4>
            <p className="text-sm text-muted-foreground">
              Download all your entries as a JSON file for backup or migration
            </p>
            <Button className="w-full mt-4 cursor-pointer">
              <Download className="w-5 h-5" />
              Export Data
            </Button>
          </div>
          <div>
            <h4 className="font-medium text-red-700">Danger Zone</h4>
            <p className="text-sm text-muted-foreground">
              Permanently delete all your journal entries. This action is
              irreversible.
            </p>
            <Button className="w-full mt-4 bg-red-700 hover:bg-red-700/90 text-white cursor-pointer">
              <Trash2 className="w-5 h-5" />
              Delete Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About Orbit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Version</h4>
            <p className="text-sm text-muted-foreground">1.0.0</p>
          </div>

          <div>
            <h4 className="font-medium">Storage</h4>
            <p className="text-sm text-muted-foreground">
              Your entries are securely stored in a database, ensuring your data
              is safe and always accessible.
            </p>
          </div>

          <div>
            <h4 className="font-medium">Keyboard Shortcuts</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">
                  Ctrl/Cmd + N
                </kbd>{" "}
                New entry
              </p>
              <p>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">
                  Ctrl/Cmd + S
                </kbd>{" "}
                Save entry
              </p>
              <p>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">
                  Ctrl/Cmd + K
                </kbd>{" "}
                Search
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
