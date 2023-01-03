import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import Error from "../../Alert/ErrorTimer"
const Redirect = () => {
  const [count, setCount] = useState(4)
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 100)
    // Redirect
    if (count === 4) {
      Error.fire({
        position: 'top',
        icon: 'error',
        iconColor: 'Red',
        title: 'คุณไม่ได้รับอณุญาติ',
        html: 'ย้ายไปหน้าหลักใน <b></b> .',
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          router.replace('/')
        }

      }, [count])

    }

    return () => clearInterval(interval)

  })

  return (
    <div>  </div>
  )
};

export default Redirect;