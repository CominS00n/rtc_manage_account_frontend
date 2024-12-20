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
        <!-- <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#ff0000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.0007 10.2815C10.9807 10.2815 9.96074 10.1015 8.99074 9.75152C8.60074 9.61152 8.40074 9.18152 8.54074 8.79152C8.69074 8.40152 9.12074 8.20152 9.51074 8.34152C11.1207 8.92152 12.8907 8.92152 14.5007 8.34152C14.8907 8.20152 15.3207 8.40152 15.4607 8.79152C15.6007 9.18152 15.4007 9.61152 15.0107 9.75152C14.0407 10.1015 13.0207 10.2815 12.0007 10.2815Z"
          />
          <path
            d="M19.0703 22.75C18.5603 22.75 18.0003 22.6 17.4603 22.29L12.5803 19.58C12.2903 19.42 11.7203 19.42 11.4303 19.58L6.55031 22.29C5.56031 22.84 4.55031 22.9 3.78031 22.44C3.01031 21.99 2.57031 21.08 2.57031 19.95V5.86C2.57031 3.32 4.64031 1.25 7.18031 1.25H16.8303C19.3703 1.25 21.4403 3.32 21.4403 5.86V19.95C21.4403 21.08 21.0003 21.99 20.2303 22.44C19.8803 22.65 19.4803 22.75 19.0703 22.75ZM12.0003 17.96C12.4703 17.96 12.9303 18.06 13.3003 18.27L18.1803 20.98C18.6903 21.27 19.1603 21.33 19.4603 21.15C19.7603 20.97 19.9303 20.54 19.9303 19.95V5.86C19.9303 4.15 18.5303 2.75 16.8203 2.75H7.18031C5.47031 2.75 4.07031 4.15 4.07031 5.86V19.95C4.07031 20.54 4.24031 20.98 4.54031 21.15C4.84031 21.32 5.30031 21.27 5.82031 20.98L10.7003 18.27C11.0703 18.06 11.5303 17.96 12.0003 17.96Z"
          />
          <path
            d="M19.0703 22.75C18.5603 22.75 18.0003 22.6 17.4603 22.29L12.5803 19.58C12.2903 19.42 11.7203 19.42 11.4303 19.58L6.55031 22.29C5.56031 22.84 4.55031 22.9 3.78031 22.44C3.01031 21.99 2.57031 21.08 2.57031 19.95V5.86C2.57031 3.32 4.64031 1.25 7.18031 1.25H16.8303C19.3703 1.25 21.4403 3.32 21.4403 5.86V19.95C21.4403 21.08 21.0003 21.99 20.2303 22.44C19.8803 22.65 19.4803 22.75 19.0703 22.75ZM12.0003 17.96C12.4703 17.96 12.9303 18.06 13.3003 18.27L18.1803 20.98C18.6903 21.27 19.1603 21.33 19.4603 21.15C19.7603 20.97 19.9303 20.54 19.9303 19.95V5.86C19.9303 4.15 18.5303 2.75 16.8203 2.75H7.18031C5.47031 2.75 4.07031 4.15 4.07031 5.86V19.95C4.07031 20.54 4.24031 20.98 4.54031 21.15C4.84031 21.32 5.30031 21.27 5.82031 20.98L10.7003 18.27C11.0703 18.06 11.5303 17.96 12.0003 17.96Z"
          />
        </svg> -->
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
