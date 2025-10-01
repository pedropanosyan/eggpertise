"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Instagram, Linkedin, Send } from "lucide-react";

interface FormErrors {
  [key: string]: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.empresa.trim()) newErrors.empresa = "La empresa es requerida";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          nombre: "",
          email: "",
          empresa: "",
          mensaje: "",
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        mensaje:
          error instanceof Error
            ? error.message
            : "Error al enviar el mensaje. Por favor intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Contacto
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Escribinos para llevar tu granja al próximo nivel
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nuestro equipo de expertos está listo para asesorarte en cada paso
            hacia la innovación
          </p>
        </div>

        <Card className="border-0 p-0 bg-white/90 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[450px]">
            {/* Contact Form */}
            <div className="col-span-1 lg:col-span-2 p-8 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold mb-4">
                  Contáctenos
                </h2>
                <p className="text-muted-foreground">
                  Déjenos su consulta y haremos todo lo posible por responderle
                  a la brevedad.
                </p>
              </div>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-muted-foreground">
                    Gracias por contactarnos. Te responderemos dentro de las
                    próximas 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Nombre*"
                        value={formData.nombre}
                        onChange={(e) =>
                          handleInputChange("nombre", e.target.value)
                        }
                        className={`transition-all duration-200 ${
                          errors.nombre
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-primary"
                        }`}
                      />
                      {errors.nombre && (
                        <p className="text-sm text-red-500">{errors.nombre}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`transition-all duration-200 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-primary"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Input
                      placeholder="Empresa*"
                      value={formData.empresa}
                      onChange={(e) =>
                        handleInputChange("empresa", e.target.value)
                      }
                      className={`transition-all duration-200 ${
                        errors.empresa
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-primary"
                      }`}
                    />
                    {errors.empresa && (
                      <p className="text-sm text-red-500">{errors.empresa}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Mensaje*"
                      value={formData.mensaje}
                      onChange={(e) =>
                        handleInputChange("mensaje", e.target.value)
                      }
                      rows={6}
                      className={`transition-all duration-200 resize-none ${
                        errors.mensaje
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-primary"
                      }`}
                    />
                    {errors.mensaje && (
                      <p className="text-sm text-red-500">{errors.mensaje}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="px-12"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="hidden lg:flex bg-primary text-primary-foreground p-8 flex-col justify-center">
              <h3 className="text-2xl font-serif mb-6">EggPertise LLC</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p>Parque Empresarial Austral</p>
                      <p>Flex 1, Módulo 3 - Av. Sgto.</p>
                      <p>Cayetano Beliera 3025</p>
                      <p>B1629 Pilar, Buenos Aires,</p>
                      <p>Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">+54 9 11 5469 5802</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">info@eggpertise.com</span>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <div className="flex items-center space-x-4">
                    <a
                      href="#"
                      className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <Instagram className="h-6 w-6 text-white group-hover:text-white" />
                    </a>
                    <a
                      href="#"
                      className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin className="h-6 w-6 text-white group-hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
