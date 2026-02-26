import React from "react";
import { createPageUrl } from "@/utils";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShireOverview({ shires = [] }) {
  return (
    <div className="surface rounded-[28px] !bg-[var(--bright-grey)] p-6 md:p-10">
      <div className="grid md:grid-cols-2 gap-6">
        {shires.map((shire) => (
          <div key={shire.title} className="bg-white rounded-[20px] p-6 border border-[var(--border)]">
            {/* Wide thin image */}
            <div className="aspect-[16/6] rounded-[16px] overflow-hidden mb-4 -mt-2">
              <img
                src={shire.image}
                alt={shire.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <h3 className="mb-1 leading-tight">{shire.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {shire.suburbs.length} suburbs serviced
            </p>
            
            <div className="space-y-0 divide-y divide-gray-100">
              {shire.suburbs.map((suburb) => {
                const isLive = suburb.isLive || false;
                const profileUrl = suburb.slug ? createPageUrl(`BlogPostDetail?slug=${encodeURIComponent(suburb.slug)}`) : null;
                
                return (
                  <div key={suburb.name} className="flex items-center justify-between py-2.5 px-3 -mx-3">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[var(--hills)] shrink-0" />
                      <span className="text-gray-900 text-sm font-medium">{suburb.name}</span>
                    </div>
                    {isLive && profileUrl ? (
                      <a href={profileUrl}>
                        <Button 
                          size="sm" 
                          className="h-7 px-3 text-xs bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
                        >
                          View Suburb Profile
                        </Button>
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-400 font-medium">Profile coming soon</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
