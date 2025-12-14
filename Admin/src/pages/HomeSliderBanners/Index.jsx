import { Button } from '@mui/material'
import React, { useState, useContext, useEffect } from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TooltipMUI from "@mui/material/Tooltip";
import { PiExportBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import { MyContext } from '../../App';
import { FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import { deleteData, fetchDataFromApi } from '../../../Utils/Api';

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "image", label: "Image", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];



const HomeSliderBanner = () => {
  const [slideData, setSlideData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedSlides, setSelectedSlides] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/homeSlides").then((res) => {
      setSlideData(res?.data || []);
    });
  }, [context?.isOpenFullScreenPanel]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteSlide = (id) => {
    deleteData(`/api/homeSlides/${id}`).then((res) => {
      context.alertBox("success", "slide Deleted");
      fetchDataFromApi("/api/homeSlides").then((res) => {
        setSlideData(res?.data || []);
      });
    });
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    if (checked) {
      const currentPageSlides = slideData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      setSelectedSlides(currentPageSlides.map(slide => slide._id));
    } else {
      setSelectedSlides([]);
    }
  };

  const handleSelectSlide = (slideId) => {
    setSelectedSlides(prev =>
      prev.includes(slideId)
        ? prev.filter(id => id !== slideId)
        : [...prev, slideId]
    );
  };

  const allPageRowsSelected = slideData
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .every((slide) => selectedSlides.includes(slide._id));

  const currentPageSlides = slideData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="card my-5 shadow-md sm:rounded-lg bg-white">
        <div className="px-4 py-5 sm:px-6 grid grid-cols-1 md:grid-cols-2  ">
          <h2 className="text-[18px] font-[600]">Home Slider Banners</h2>
          <div className="col justify-start md:justify-end flex items-center gap-2">
            <TooltipMUI title="Export" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black !hover:bg-black-300 hover:scale-105">
                <PiExportBold />
              </Button>
            </TooltipMUI>
            <TooltipMUI title="Add Home Banner Slider" placement="top">
              <Button className="!w-[35px] !h-[35px] btn btn-sm flex items-center !rounded-full !text-black hover:bg-black-300 hover:scale-105" onClick={() => context.setIsOpenFullScreenPanel({
                open: true,
                model: 'Add Home Slide',
              })}>
                <span className="text-[18px]"><FaPlus /></span>
              </Button>
            </TooltipMUI>
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" sx={{ pl: 2 }}>
                    <Checkbox checked={allPageRowsSelected} onChange={handleSelectAll} color="primary" />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} sx={{ fontWeight: "bold" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {currentPageSlides.map((slide, index) => {
                  const action = (
                    <div className="flex items-center gap-1">
                      <TooltipMUI title="Edit Slide" placement="top">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]">
                          <FaEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                      </TooltipMUI>

                      <TooltipMUI title="Remove Slide" placement="top">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.1)] !rounded-full hover:!bg-[#ccc]" onClick={() => deleteSlide(slide._id)}>
                          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[25px]" />
                        </Button>
                      </TooltipMUI>
                    </div>
                  );

                  const imageCell = (
                    <div className="img w-[80px] h-[50px] rounded-md overflow-hidden">
                      <img
                        src={slide.images[0]}
                        alt="Banner"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );

                  const row = { id: slide._id, image: imageCell, action };

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={slide._id}>
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        <Checkbox
                          checked={selectedSlides.includes(slide._id)}
                          onChange={() => handleSelectSlide(slide._id)}
                          color="primary"
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={slideData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default HomeSliderBanner;


