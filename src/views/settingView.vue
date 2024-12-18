<template>
  <section>
    <h1 class="font-bold text-2xl py-3">Setting Page</h1>
    <v-sard>
      <v-card-text>
        <!-- <div ref="pdfContent" class="pdf-content">
          <div class="content">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              facilis vel doloremque pariatur aspernatur distinctio ipsam
              molestias, earum sapiente. Maxime.
            </p>
            <v-stepper model-value="2">
              <v-stepper-header>
                <v-stepper-item
                  title="Select campaign settings"
                  value="1"
                  complete
                ></v-stepper-item>

                <v-divider></v-divider>

                <v-stepper-item
                  title="Create an ad group"
                  value="2"
                ></v-stepper-item>

                <v-divider></v-divider>

                <v-stepper-item title="Create an ad" value="3"></v-stepper-item>
              </v-stepper-header>
            </v-stepper>
          </div>
        </div> -->
        <div>
          <!-- <h2>
            มีคำขอสร้างบัญชีผู้ใช้ (RTC Request Account)
            ที่ต้องการการอนุมัติจากท่าน
          </h2>
          <p>เรียนคุณ ${html.em_name}</p>
          <a
            style="
              background-color: #facc15;
              padding: 6px 12px;
              border: none;
              border-radius: 8px;
            "
            href="http://localhost:3000/approval/:token"
          >
            Approved Request Account (RTC)
          </a>

          <p>
            กรุณาดำเนินการยืนยันภายใน 24 ชั่วโมง
            มิฉะนั้นคำขอจะถูกยกเลิกโดยอัตโนมัติ
          </p>

          <a href="http://localhost:3000/status/:id">ติดตามสถานะ </a>

          <div>
            <p>ขอแสดงความนับถือ,</p>
            <p>NT National Telecom</p>
          </div> -->
          <p>from:</p>
          <p>to:</p>
          <p>subject: คำขอสร้างบัญชีผู้ใช้ (RTC Request Account)</p>
          <p>date:</p>
          <p>เรียนคุณ ${html.em_name}</p>
          <p>
            มีคำขอสร้างบัญชีผู้ใช้ (RTC Request Account)
            ที่ต้องการการอนุมัติจากท่าน
          </p>
          <div>
            <p>รายละเอียดคำขอ:</p>
            <p>ชื่อผู้ขอ: ${user_name}</p>
            <p>อีเมลผู้ขอ: ${user_email}</p>
            <p>วันที่ส่งคำขอ: ${request_date}</p>
          </div>
          <p>กรุณาดำเนินการอนุมัติคำขอผ่านลิงก์ด้านล่าง:</p>
          <a
            style="
              background-color: #facc15;
              padding: 6px 12px;
              border: none;
              border-radius: 8px;
            "
            href="http://localhost:3000/approval/:token"
          >
            Approved Request Account (RTC)
          </a>
          <p>
            โปรดทราบว่าการอนุมัติต้องดำเนินการภายใน 24 ชั่วโมง หากไม่ดำเนินการ
            คำขอจะถูกยกเลิกโดยอัตโนมัติ
          </p>

          <p>ขอแสดงความนับถือ,</p>
          <p>NT National Telecom</p>
        </div>
      </v-card-text>
    </v-sard>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const pdfContent = ref<HTMLElement | null>(null)

const generateHTML = async () => {
  const element = pdfContent.value
  if (!element) return
  return element
}

onMounted(async () => {
  generateHTML()
})
</script>
