import FormCreateAmenty from "@/components/admin/FormCreateAmenty"
import TableAmenities from "@/components/admin/TableAmenities"

const ManageAmenities = () => {
  return (
    <div className="space-y-5">
        <FormCreateAmenty />
        <TableAmenities />
    </div>
  )
}
export default ManageAmenities