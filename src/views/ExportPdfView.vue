<template>
  <div class="flex flex-col gap-y-2">
    <v-btn @click="router.go(-1)" class="w-fit" v-show="!props.views_only">
      <template #prepend>
        <nt_icon icon="arrow-left" />
      </template>
      Back
    </v-btn>
    <v-card>
      <div class="p-4" v-show="!props.views_only">
        <v-btn @click="generatePdf" rounded>
          <template #prepend>
            <document-download />
          </template>
          <template #default>
            <p class="capitalize">Download PDF</p>
          </template>
        </v-btn>
      </div>
      <v-card-text class="flex flex-col items-center">
        <div
          ref="pdfContent"
          class="pdf-content scale-50 sm:scale-75 md:scale-100"
        >
          <div class="content">
            <div class="detail flex justify-between items-center">
              <img
                src="/src/assets/logo/ntlogo.png"
                alt="nt_logo"
                class="h-12"
                crossorigin="anonymous"
              />
              <h1 class="text-xl font-bold">RTC Account Request (RTC)</h1>
            </div>
            <p class="sub-text px-3 py-2">
              แบบฟอร์มขอเข้าใช้ระบบภายใต้ความดูแลของส่วนปฏิบัติการระบบ Real Time
              Charging สื่อสารไร้สาย
            </p>
            <p class="sub-text font-bold px-3 bg-gray-300">User Information</p>
            <div class="detail">
              <div class="grid grid-cols-2 gap-y-2">
                <p>
                  <span class="font-bold">Full Name:</span>
                  {{ data?.full_name }}
                </p>
                <p>
                  <span class="font-bold">Position:</span> {{ data?.position }}
                </p>
                <p>
                  <span class="font-bold">Company:</span> {{ data?.company }}
                </p>
                <p>
                  <span class="font-bold">Division:</span> {{ data?.division }}
                </p>
                <p>
                  <span class="font-bold">Telephone:</span>
                  {{ data?.telephone }}
                </p>
                <p>
                  <span class="font-bold">Email address:</span>
                  {{ data?.email }}
                </p>
              </div>
            </div>
            <p class="sub-text font-bold px-3 bg-gray-300">
              Request Information
            </p>
            <div class="detail">
              <div class="grid grid-cols-2 gap-y-2">
                <label class="flex items-center gap-2">
                  <span class="font-bold">Request type: </span>
                  <tick-icon />
                  <p class="capitalize">{{ data?.req_type }}</p>
                </label>
                <p>
                  <span class="font-bold">System: </span>
                  <span v-for="item in data?.system" :key="item">{{
                    item
                  }}</span>
                </p>
                <p>
                  <span class="font-bold">Request Date:</span>
                  {{ data?.req_date }}
                </p>
              </div>
            </div>
            <p class="sub-text font-bold px-3 bg-gray-300">Requisition</p>
            <div class="detail">
              <div class="grid grid-cols-2 gap-y-2">
                <p>
                  <span class="font-bold">Type of Account: </span>
                  {{ data?.account_type }}
                </p>
                <p>
                  <span class="font-bold">Expiry Date: </span>
                  {{ data?.expiry_date || '-' }}
                </p>

                <div class="flex">
                  <span class="font-bold">Service type: </span>
                  <ul class="ml-2">
                    <li v-for="item in data?.service_type" :key="item">
                      <span class="inline-flex gap-2">
                        <tick-icon />
                        <p class="capitalize">{{ item }}</p>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="flex">
                  <span class="font-bold">User type: </span>
                  <ul class="ml-2">
                    <li v-for="item in data?.user_type" :key="item">
                      <span class="inline-flex gap-2">
                        <tick-icon />
                        <p class="capitalize">{{ item }}</p>
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="col-span-2">
                  <p>
                    *
                    ข้อมูลที่อยู่บนระบบทั้งหมดเมื่อเข้าใช้งานแล้วกรุณาไม่เผยแพร่ต่อเพราะเป็นข้อมูลลูกค้า
                  </p>
                  <p>
                    * การใช้งานทั้งหมดตาม User Type บน Authorization Matrix ตาม
                    Sheet (Authorization Matrix)
                  </p>
                </div>
              </div>
            </div>
            <p class="sub-text font-bold px-3 bg-gray-300">Approval List</p>
            <div class="detail">
              <div class="space-y-2">
                <div v-for="item in data?.approved" :key="item.id">
                  <div
                    v-if="item.type === 'Head of Requestor Approver'"
                    class="grid grid-cols-2 items-center gap-x-4"
                  >
                    <div class="inline-flex items-center">
                      <div class="w-44">
                        <span class="font-bold text-wrap">
                          {{ item.type }}</span
                        >
                      </div>
                      <div class="inline-flex flex-col items-center">
                        <img
                          :src="item.signature || ''"
                          alt=""
                          crossorigin="anonymous"
                          class="signature h-12"
                        />
                        <p>({{ item.name }})</p>
                      </div>
                    </div>
                    <div class="inline-flex space-x-2">
                      <span class="font-bold">Remark: </span>
                      <p>{{ item.remark }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="sub-text font-bold px-3 bg-gray-300">Acknowledge</p>
            <div class="detail">
              <div>
                <div v-for="item in data?.approved" :key="item.id">
                  <div
                    v-if="item.type === 'Implementor'"
                    class="grid grid-cols-2 items-center gap-x-4"
                  >
                    <div class="inline-flex items-center">
                      <div class="w-44">
                        <span class="font-bold text-wrap">
                          {{ item.type }}</span
                        >
                      </div>
                      <div class="inline-flex flex-col items-center">
                        <img
                          :src="item.signature || ''"
                          alt=""
                          crossorigin="anonymous"
                          class="signature h-12"
                        />
                        <p>({{ item.name }})</p>
                      </div>
                    </div>
                    <div class="inline-flex space-x-2">
                      <span class="font-bold">Remark: </span>
                      <p>{{ item.remark }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="sub-text font-bold px-3 bg-gray-300">
              Remark Account (RTC)
            </p>
            <div class="detail border-none">
              <div>
                {{ data?.remarks }}
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

import nt_icon from '@/components/icon/nt_icon.vue'
import documentDownload from '@/assets/logo/icons/documents/documentDownload.vue'
import tickIcon from '@/assets/logo/icons/tickIcon.vue'

import { useAccReqApi } from '@/composable/accReqApi'
import type { AccReq } from '@/types/accReqs'
import router from '@/router'

const { params } = useRoute()
const { getAccReq, accReq } = useAccReqApi()
const data = ref<AccReq | null>(null)

const pdfContent = ref<HTMLElement | null>(null)

const props = defineProps({
  views_only: {
    type: Boolean,
    default: false,
  },
})
const id = ref<string>(params.id as string)

onMounted(async () => {
  await getAccReq(id.value)
  if (accReq.value && accReq.value.length > 0) {
    data.value = accReq.value[0]
  }
})

const generatePdf = async () => {
  const element = pdfContent.value
  try {
    await html2canvas(element as HTMLElement, { scale: 3 }).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const padding = 10 // กำหนด padding
      const contentWidth = pdfWidth - padding * 2
      const contentHeight = pdfHeight - padding * 2
      const imgData = canvas.toDataURL('image/png')
      const imgHeight = (canvas.height * contentWidth) / canvas.width

      if (imgHeight <= contentHeight) {
        pdf.addImage(imgData, 'PNG', padding, padding, contentWidth, imgHeight)
      } else {
        let yOffset = 0
        while (yOffset < imgHeight) {
          pdf.addImage(
            imgData,
            'PNG',
            padding,
            padding - yOffset,
            contentWidth,
            imgHeight,
          )
          yOffset += contentHeight
          if (yOffset < imgHeight) pdf.addPage()
        }
      }

      pdf.save('download.pdf')
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.pdf-content {
  /* padding: 30px; */
  background: white;
  width: 21cm;

  * {
    break-inside: avoid;
  }
}

.content {
  /* padding: 15px; */
  border: 2px solid black;
}
.sub-text {
  border-bottom: 2px solid black;
}
.detail {
  padding: 12px;
  border-bottom: 2px solid black;
}

.signature {
  border-bottom: 1px solid black;
}

p {
  font-size: 14px;
}

h2 {
  font-size: 16px;
}

.hidden {
  display: none;
}
</style>
