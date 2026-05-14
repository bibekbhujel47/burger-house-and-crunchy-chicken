"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Phone,
  MapPin,
  Clock,
  Truck,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import buildWhatsAppURL from "@/app/utils/whatsApp";
import SITE_DATA from "@/constants";

interface ContactSectionProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
  deliveryNote: string;
  labels: {
    location: string;
    call: string;
    hours: string;
    order: string;
    actions: {
      maps: string;
      call: string;
      menu: string;
      orderBtn: string;
    };
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  badge,
  title,
  titleHighlight,
  description,
  phone,
  address,
  hours,
  deliveryNote,
  labels,
}) => {
  const contactCards = [
    {
      icon: <MapPin size={28} />,
      title: labels.location,
      value: address,
      action: labels.actions.maps,
      link: SITE_DATA.burgerHouseGoogleMapLink,
    },
    {
      icon: <Phone size={28} />,
      title: labels.call,
      value: phone,
      action: labels.actions.call,
      link: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: <Clock size={28} />,
      title: labels.hours,
      value: hours,
      action: labels.actions.menu,
      link: "",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-end mb-16">
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-yellow-600 font-black uppercase tracking-[0.3em] text-xs"
            >
              {badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-zinc-900 mt-4 tracking-tighter"
            >
              {title} <span className="text-yellow-500">{titleHighlight}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex-1 text-zinc-500 text-lg max-w-md"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, i) => (
            <motion.a
              key={i}
              href={card.link}
              target={card.link.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 group p-8 rounded-[2.5rem] flex flex-col justify-between h-full transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl shadow-zinc-200"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-8 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-300">
                {card.icon}
              </div>
              <div>
                <h4 className="text-white/50 text-xs font-black uppercase tracking-widest mb-2">
                  {card.title}
                </h4>
                <p className="text-white text-xl font-bold leading-tight mb-6">
                  {card.value}
                </p>
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                  {card.action} <ExternalLink size={14} />
                </div>
              </div>
            </motion.a>
          ))}

          {/* Delivery Special Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-yellow-400 p-8 rounded-[2.5rem] flex flex-col justify-between border-4 border-zinc-900 shadow-[10px_10px_0px_0px_rgba(24,24,27,1)]"
          >
            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-yellow-400 mb-8">
              <Truck size={28} />
            </div>
            <div>
              <h4 className="text-zinc-900/50 text-xs font-black uppercase tracking-widest mb-2">
                {labels.order}
              </h4>
              <p className="text-zinc-900 text-xl font-black leading-tight mb-6">
                {deliveryNote}
              </p>
              <div className="flex w-full justify-center items-center mt-6">
                <Link
                  href={buildWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
      group relative flex w-full items-center justify-center gap-2
      rounded-xl bg-zinc-900 py-4 px-10
      text-xs font-black uppercase tracking-widest text-white
      transition-all duration-300
      
      /* The Fix: High-contrast hover colors */
      hover:bg-[#FFD700] hover:text-black 
      hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]
      
      active:scale-95
    "
                >
                  {/* Label */}
                  <span className="relative z-10">
                    {labels.actions.orderBtn}
                  </span>

                  {/* Icon with hover shift */}
                  <ArrowUpRight
                    size={16}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />

                  {/* Optional: Subtle internal glow on hover */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 text-[15rem] font-black text-zinc-50 select-none pointer-events-none -z-10 tracking-tighter">
        DAMAULI
      </div>
    </section>
  );
};
