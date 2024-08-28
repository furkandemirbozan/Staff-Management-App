import React from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import HelpIcon from "@mui/icons-material/Help";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

function SupportWidget() {
  return (
    <div className="flex flex-col col-span-full row-span-1 sm:col-span-6 xl:col-span-6 bg-gradient-to-r from-green-400 to-blue-600 dark:bg-black shadow-sm rounded-xl bg-no-repeat bg-bottom ">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-white dark:text-white">
          Yardım Merkezi
        </h2>
      </header>

      <div className="flex flex-col grow gap-2 overflow-y-scroll no-scrollbar max-h-64">
        {/* AccordionElement */}
        <Accordion className="bg-transparent border-none shadow-none">
          <AccordionSummary
            className="bg-transparent mb-0 py-0 my-0 cursor-pointer"
            expandIcon={<KeyboardDoubleArrowDownIcon className="text-white" />}
          >
            <div className="flex items-center">
              <HelpIcon className="w-8 h-8 mr-2 text-white" />
              <h1 className="text-left font-semibold text-sm text-white">
                Staff Management sisteminde yeni bir personel nasıl eklenir?
              </h1>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-transparent mt-0 pt-0 text-gray-200">
            Yeni bir personel eklemek için Staff Management sistemine giriş yaptıktan sonra "Personel Yönetimi" sekmesine gidin. "Yeni Personel Ekle" butonuna tıklayın ve gerekli bilgileri girin.
          </AccordionDetails>
        </Accordion>
        {/* AccordionElement */}
        <Accordion className="bg-transparent border-none shadow-none">
          <AccordionSummary
            className="bg-transparent mb-0 py-0 my-0 cursor-pointer"
            expandIcon={<KeyboardDoubleArrowDownIcon className="text-white" />}
          >
            <div className="flex items-center">
              <HelpIcon className="w-8 h-8 mr-2 text-white" />
              <h1 className="text-left font-semibold text-sm text-white">
                Şifre sıfırlama işlemi nasıl yapılır?
              </h1>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-transparent mt-0 pt-0 text-gray-200">
            Şifrenizi sıfırlamak için giriş ekranında "Şifremi Unuttum" seçeneğine tıklayın. E-posta adresinizi girin ve size gönderilen bağlantıyı kullanarak yeni bir şifre belirleyin.
          </AccordionDetails>
        </Accordion>
        {/* AccordionElement */}
        <Accordion className="bg-transparent border-none shadow-none">
          <AccordionSummary
            className="bg-transparent mb-0 py-0 my-0 cursor-pointer"
            expandIcon={<KeyboardDoubleArrowDownIcon className="text-white" />}
          >
            <div className="flex items-center">
              <HelpIcon className="w-8 h-8 mr-2 text-white" />
              <h1 className="text-left font-semibold text-sm text-white">
                İzin talebini nasıl gönderebilirim?
              </h1>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-transparent mt-0 pt-0 text-gray-200">
            İzin talebinizi göndermek için Staff Management sistemine giriş yapın. "İzin Talebi" sekmesine gidin ve gerekli tarihleri ve nedeni belirterek talebinizi oluşturun.
          </AccordionDetails>
        </Accordion>
        {/* AccordionElement */}
        <Accordion className="bg-transparent border-none shadow-none">
          <AccordionSummary
            className="bg-transparent mb-0 py-0 my-0 cursor-pointer"
            expandIcon={<KeyboardDoubleArrowDownIcon className="text-white" />}
          >
            <div className="flex items-center">
              <HelpIcon className="w-8 h-8 mr-2 text-white" />
              <h1 className="text-left font-semibold text-sm text-white">
                Kişisel bilgilerimi nasıl güncelleyebilirim?
              </h1>
            </div>
          </AccordionSummary>
          <AccordionDetails className="bg-transparent mt-0 pt-0 text-gray-200">
            Kişisel bilgilerinizi güncellemek için profil sayfanıza gidin ve ilgili alanlarda düzenleme yaparak bilgilerinizi kaydedin.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default SupportWidget;
