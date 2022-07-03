export const COLUMNS = [
  {
    Header: 'STT',
    accessor: 'index'
  },
  {
    id: 'hotelName',
    Header: 'Tên chỗ ở',
    accessor: 'hotel[0].name'
  },
  {
    Header: 'Ngày tạo',
    accessor: 'createdAt'
  },
  {
    Header: 'Ngày nhận',
    accessor: 'checkinDate'
  },
  {
    Header: 'Tổng tiền',
    accessor: 'totalPrice'
  },
  {
    Header: 'Tình trạng',
    accessor: 'checking'
  }
]
