import Authentication from '@/components/Auth/Authentication'
import React from 'react'

type Props = {
  children: React.ReactNode;
}

const AdminLayout = (props: Props) => {
  return (
    <Authentication>
      {props.children}
    </Authentication>
  )
}

export default AdminLayout