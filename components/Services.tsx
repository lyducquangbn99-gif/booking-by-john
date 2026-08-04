import { PackageCheck, Plane, Ship, Truck, Warehouse, ClipboardCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

const icons = [Ship, Plane, Truck, Warehouse, ClipboardCheck, PackageCheck];
const COPY: Record<string, { label: string; heading: string; details: string; items: Array<[string, string]> }> = {
  en: { label: "Services", heading: "Freight services built around clear communication", details: "View service details", items: [
    ["Ocean Freight", "FCL and LCL shipping with practical routing and rate guidance."], ["Air Freight", "Urgent cargo support when speed matters more than ocean transit."], ["Inland Trucking", "Port pickup, inland delivery, and coordinated container movement."], ["Warehousing", "Storage and handling support before export or final delivery."], ["Customs Clearance", "Documentation and clearance coordination to reduce delays."], ["Door to Door", "End-to-end logistics from Vietnam origin to overseas consignee."],
  ]},
  vi: { label: "Dịch vụ", heading: "Dịch vụ vận chuyển với thông tin rõ ràng", details: "Xem chi tiết dịch vụ", items: [
    ["Vận tải biển", "Giải pháp FCL và LCL với tư vấn tuyến đi và chi phí thực tế."], ["Vận tải hàng không", "Hỗ trợ hàng gấp khi thời gian quan trọng hơn vận tải biển."], ["Vận chuyển nội địa", "Lấy hàng tại cảng, giao nội địa và điều phối container."], ["Kho bãi", "Lưu kho và xử lý hàng trước khi xuất khẩu hoặc giao cuối."], ["Thông quan", "Điều phối chứng từ và thủ tục để giảm chậm trễ."], ["Door to Door", "Điều phối từ điểm lấy hàng tại Việt Nam đến người nhận nước ngoài."],
  ]},
  it: { label: "Servizi", heading: "Servizi di trasporto con comunicazione chiara", details: "Vedi i dettagli", items: [
    ["Trasporto marittimo", "Spedizioni FCL e LCL con indicazioni pratiche su rotta e costi."], ["Trasporto aereo", "Supporto per merci urgenti quando il tempo è prioritario."], ["Trasporto interno", "Ritiro portuale, consegna interna e movimento container."], ["Magazzino", "Stoccaggio e movimentazione prima dell’export o della consegna."], ["Sdoganamento", "Coordinamento documentale e doganale per ridurre i ritardi."], ["Door to Door", "Logistica dall’origine in Vietnam al destinatario estero."],
  ]},
  es: { label: "Servicios", heading: "Servicios de carga con comunicación clara", details: "Ver detalles", items: [
    ["Transporte marítimo", "Envíos FCL y LCL con orientación práctica sobre rutas y costos."], ["Transporte aéreo", "Apoyo para carga urgente cuando el tiempo es prioritario."], ["Transporte interior", "Recogida portuaria, entrega y movimiento de contenedores."], ["Almacenamiento", "Almacenaje y manipulación antes de exportar o entregar."], ["Despacho aduanero", "Coordinación documental y aduanera para reducir retrasos."], ["Puerta a puerta", "Logística desde el origen en Vietnam hasta el destinatario."],
  ]},
  id: { label: "Layanan", heading: "Layanan pengiriman dengan komunikasi yang jelas", details: "Lihat detail layanan", items: [
    ["Angkutan laut", "Pengiriman FCL dan LCL dengan panduan rute dan biaya praktis."], ["Angkutan udara", "Dukungan kargo mendesak saat waktu menjadi prioritas."], ["Trucking", "Penjemputan pelabuhan, pengiriman darat, dan pergerakan kontainer."], ["Pergudangan", "Penyimpanan dan penanganan sebelum ekspor atau pengiriman."], ["Bea cukai", "Koordinasi dokumen dan clearance untuk mengurangi keterlambatan."], ["Door to Door", "Logistik dari asal di Vietnam hingga penerima luar negeri."],
  ]},
};

export default async function Services() {
  const locale = await getLocale();
  const copy = COPY[locale] || COPY.en;
  return (
    <section id="services" className="border-y border-border-subtle bg-white px-5 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-wide text-ocean-blue">{copy.label}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            {copy.heading}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map(([title, description], index) => {
            const Icon = icons[index];
            return (
              <article key={title} className="rounded-lg border border-border-subtle bg-white p-6 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-orange-50 text-accent-orange">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-black text-[#0B1F3A]">{title}</h3>
                <p className="mt-3 leading-7 text-text-secondary">{description}</p>
                {([0, 1, 4, 5].includes(index)) && (
                  <Link href={index === 0 ? "/services/freight-forwarder-vietnam" : index === 1 ? "/services/air-freight-vietnam" : index === 4 ? "/services/customs-clearance-vietnam" : "/services/door-to-door-shipping-vietnam"} className="mt-4 inline-flex font-bold text-ocean-blue underline underline-offset-4">
                    {copy.details}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
