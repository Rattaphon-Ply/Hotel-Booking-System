import * as React from "react";
import useStore from "@/store/store";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

function valuetext(value) {
  return `${value} ฿`;
}

const RoomFilterBar = ({
  showQuery = true,
  showPrice = true,
  showDate = true,
  showSort = true,
  bgColor = "#E8F5E9",
  primaryColor = "#43A047",
  buttonColor = "#2E7D32",
}) => {
  const searchRooms = useStore((s) => s.searchRooms);
  const getRooms = useStore((s)=>s.getRooms)

  const [query, setQuery] = React.useState("");
  const [priceRange, setPriceRange] = React.useState([1000, 7000]);
  const [sort, setSort] = React.useState("asc");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  const handleFilter = (e) => {
    e.preventDefault();
    const filters = {};
    if (showQuery) filters.query = e.target.query?.value || undefined;
    if (showPrice) filters.price = priceRange;
    if (showDate) {
      filters.start = e.target.start?.value || undefined;
      filters.end = e.target.end?.value || undefined;
    }
    if (showSort) filters.sort = sort;
    searchRooms(filters);
  };

  return (
    <form onSubmit={handleFilter}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          p: 3,
          bgcolor: bgColor,
          borderRadius: 3,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
        alignItems="center"
        justifyContent="center"
      >
        {/* Search */}
        {showQuery && (
          <TextField
            name="query"
            label="ค้นหาห้อง..."
            size="small"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // เพิ่ม
            sx={{
              width: 300,
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": { borderColor: primaryColor },
              },
              "& .MuiInputLabel-root": { color: primaryColor },
              "& .MuiInputBase-input": { color: primaryColor },
            }}
          />
        )}

        {/* Price Slider */}
        {showPrice && (
          <Box sx={{ width: 250 }}>
            <p
              style={{
                margin: "4px 0",
                color: primaryColor,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              ราคา: {priceRange[0]}฿ - {priceRange[1]}฿
            </p>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              getAriaValueText={(v) => `${v}฿`}
              min={0}
              max={10000}
              step={100}
              sx={{
                color: primaryColor,
                "& .MuiSlider-thumb": {
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                },
              }}
            />
          </Box>
        )}

        {/* Date Picker */}
        {showDate && (
          <>
            <TextField
              name="start"
              label="เช็คอิน"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              inputProps={{
                min: new Date().toISOString().split("T")[0], // ไม่ให้เลือกวันก่อนวันนี้
              }}
              sx={{
                width: 160,
                bgcolor: "white",
                borderRadius: 2,
              }}
            />
            <TextField
              name="end"
              label="เช็คเอาท์"
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              inputProps={{
                min: startDate || new Date().toISOString().split("T")[0], // ไม่ให้เลือกก่อน start
              }}
              sx={{
                width: 160,
                bgcolor: "white",
                borderRadius: 2,
              }}
            />
          </>
        )}

        {/* Sort */}
        {showSort && (
          <TextField
            select
            label="เรียงราคา"
            size="small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{
              width: 140,
              bgcolor: "white",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          >
            <MenuItem value="asc">น้อย → มาก</MenuItem>
            <MenuItem value="desc">มาก → น้อย</MenuItem>
          </TextField>
        )}

        {/* Filter Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: buttonColor,
            px: 3,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
            color: "white",
            "&:hover": { bgcolor: "#212121" },
          }}
        >
          ค้นหา
        </Button>

        <Button
          type="button"
          variant="outlined"
          onClick={() => {
            setQuery("");
            setPriceRange([1000, 7000]);
            setSort("asc");
            setStartDate("");
            setEndDate("");
            getRooms()
          }}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: 2,
            color: primaryColor,
            borderColor: primaryColor,
            "&:hover": { bgcolor: "#e0e0e0", borderColor: primaryColor },
          }}
        >
          ล้าง
        </Button>
      </Stack>
    </form>
  );
};

export default RoomFilterBar;
