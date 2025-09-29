/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IApplication } from "@/types/application.type";
import { Minus, Plus } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

interface ApplicationDetailsModalProps {
  application: IApplication | null;
  isOpen: boolean;
  onClose: () => void;
  mutate?: KeyedMutator<{ data: IApplication[] }>;
}

export const ApplicationDetailsModal: React.FC<
  ApplicationDetailsModalProps
> = ({ application, isOpen, onClose, mutate }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState("center center");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  if (!application) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.25));
  const handleResetZoom = () => {
    setZoom(1);
    setOrigin("center center");
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = imageWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Update transform-origin based on cursor
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);

    const delta = e.deltaY < 0 ? 0.25 : -0.25;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.25), 5));
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setStartDrag({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - startDrag.x, y: e.clientY - startDrag.y });
  };
  const handleMouseUp = () => setDragging(false);

  //   Function to handle application status change
  const handelApplicationStatusChange = async (status: string) => {
    const res = await api.patch(
      `/api/v1/admin/application/${application._id}/review`,
      {
        status: status,
      }
    );

    if (res.status === 200) {
      toast.success("Application status updated successfully");
      mutate?.();
      onClose();
    } else {
      toast.error("Failed to update application status");
    }
  };

  return (
    <>
      {/* Main Application Modal */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl">
          <DialogHeader className="">
            <DialogTitle>Application Details</DialogTitle>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`capitalize ${
                  application.status === "approved"
                    ? "text-green-600"
                    : application.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {application.status}
              </span>
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <p>
                <strong>User Name:</strong> {application.user.fullName}
              </p>
              <p>
                <strong>Business Name:</strong> {application.businessType}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p>
                <strong>Tax ID:</strong> {application.taxId}
              </p>

              <p>
                <strong>Phone:</strong> {application.phone}
              </p>
            </div>
            <div>
              <p>
                <strong>Address:</strong> {application.address}
              </p>
            </div>
            <p>
              <strong>User Email:</strong> {application.user.email}
            </p>
            <p>
              <strong>Business Email:</strong> {application.email}
            </p>
            <p>
              <strong>Description:</strong> {application.description || "-"}
            </p>
            <p>
              <strong>Identity Type:</strong> {application.idType}
            </p>

            {/* Document Previews */}
            <div className="flex flex-wrap gap-3 mt-2">
              {application.idType === "national_id" && (
                <>
                  {application.nidFront && (
                    <img
                      src={application.nidFront}
                      alt="NID Front"
                      className="h-24 w-36 object-cover rounded cursor-pointer border"
                      onClick={() => {
                        setFullscreenImage(application.nidFront!);
                        setZoom(1);
                        setOrigin("center center");
                        setPosition({ x: 0, y: 0 });
                      }}
                    />
                  )}
                  {application.nidBack && (
                    <img
                      src={application.nidBack}
                      alt="NID Back"
                      className="h-24 w-36 object-cover rounded cursor-pointer border"
                      onClick={() => {
                        setFullscreenImage(application.nidBack!);
                        setZoom(1);
                        setOrigin("center center");
                        setPosition({ x: 0, y: 0 });
                      }}
                    />
                  )}
                </>
              )}
              {application.idType === "passport" && application.passport && (
                <img
                  src={application.passport}
                  alt="Passport"
                  className="h-24 w-36 object-cover rounded cursor-pointer border"
                  onClick={() => {
                    setFullscreenImage(application.passport!);
                    setZoom(1);
                    setOrigin("center center");
                    setPosition({ x: 0, y: 0 });
                  }}
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <div className="w-full flex justify-between items-center gap-2">
              <div className="flex gap-2">
                {application.status !== "approved" && (
                  <Button
                    onClick={() => handelApplicationStatusChange("approved")}
                  >
                    Approve
                  </Button>
                )}
                {application.status !== "rejected" && (
                  <Button
                    onClick={() => handelApplicationStatusChange("rejected")}
                  >
                    Reject
                  </Button>
                )}
              </div>
              <Button onClick={onClose}>close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <Dialog
          open={!!fullscreenImage}
          onOpenChange={() => setFullscreenImage(null)}
        >
          <DialogContent className="w-[50vw] h-[50vh] p-0  rounded-lg flex flex-col">
            <DialogHeader className="flex justify-between items-center text- p-4">
              <DialogTitle>Document Preview</DialogTitle>
            </DialogHeader>

            <div
              ref={imageWrapperRef}
              className="flex-1 flex items-center justify-center overflow-hidden bg-black cursor-grab"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={fullscreenImage}
                alt="Fullscreen Document"
                className="object-contain select-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                  transformOrigin: origin,
                  transition: dragging ? "none" : "transform 0.1s ease-out",
                  cursor: dragging ? "grabbing" : "grab",
                }}
              />
            </div>

            <DialogFooter className="p-4 flex justify-between items-center">
              <div className="flex gap-2 text-black">
                <Button size="sm" variant="outline" onClick={handleZoomOut}>
                  <Minus />
                </Button>
                <Button size="sm" variant="outline" onClick={handleResetZoom}>
                  Reset
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomIn}>
                  <Plus />
                </Button>
              </div>
              <Button onClick={() => setFullscreenImage(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
