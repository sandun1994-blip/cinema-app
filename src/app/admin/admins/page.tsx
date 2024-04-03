import { CreateAdmin } from "@/components/organisms/CreateAdmin"
import ListAdmin from "@/components/templates/ListAdmins"


const page = () => {
  return (
    <div>
        <div>Manage Admins</div>
        <CreateAdmin/>
        <ListAdmin/>
    </div>
  )
}

export default page