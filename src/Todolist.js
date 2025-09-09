
import {
  CssBaseline,
  Container,
  Card,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import "./Todolist.css";
import TodoItem from "./Todos";
import Button from "@mui/material/Button";
import { useState, useEffect, useMemo, useReducer } from "react";
import TextField from "@mui/material/TextField";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useSnackbar } from "./contexts/SnackbarContext";
import Todored from "./Reducers/TodolistReducer";
import { useTodos } from "./contexts/TodosContext"

import { useContext } from "react";



export default function Todo() {
  // ==================== State Management ====================
  const { showSnackbar } = useSnackbar();
  const [DisplayTodos, setDisplayTodos] = useState("all");
  const [openDeleteAll, setOpenDeleteAll] = useState(false);
  const [todo, setTodo] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { todos, dispatch } = useTodos();

  // ==================== Local Storage Setup ====================
 useEffect(() => {
    dispatch({ type: "GET", });
  }, []);
  // ==================== Todo Management Functions ====================
  function AddTodo() {
    if (todo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: todo });
      setTodo("");
      showSnackbar("تمت إضافة المهمة بنجاح!", "success");
    }
  }

  // ==================== Edit Functions ====================  
  function handleEdit(id, newText){
    dispatch({ type: "EDIT_TODO", payload:{
      id,
      text: newText
    } });
    showSnackbar("تم تعديل المهمة بنجاح!", "info");
  }

  function handleSaveEdit() {
    if (editingId && editText.trim() !== "") {
      handleEdit(editingId, editText);
      setOpenEdit(false);
      setEditingId(null);
      setEditText("");
      
    }
  }

  function handleStartEdit(id, currentText) {
    setEditingId(id);
    setEditText(currentText);
    setOpenEdit(true);
  }

  // ==================== Toggle Check Functions ====================
  function handleToggleCheck(id) {
    dispatch({ type: "TOGGLE_TODO", payload: id });
    const updatedTodo = todos.find((t) => t.id === id);
    if (updatedTodo && !updatedTodo.comp) {
      showSnackbar('تم إنجاز المهمة بنجاح !', 'success');
    } else {
      showSnackbar('المهمة لم تعد مكتملة، خذ وقتك كل شي بوقته', 'warning');
    }
    return updatedTodo;
  }

  // ==================== Dialog Functions ====================
  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };



  const handleConfirmDelete = () => {
    if (deleteId) {
      handleDelete(deleteId);
    }
    handleClose();
  };

  // ==================== Delete Functions ====================
  function handleDelete(id) {
    dispatch({ type: "DELETE_TODO", payload: id })
    showSnackbar("تم حذف المهمة بنجاح!", "error");
  }

  function handleDeleteAll() {
    dispatch({ type: "DELETE_ALL" });
    showSnackbar("تم حذف جميع المهام بنجاح!", "error");
    setOpenDeleteAll(false);
  }

  // ==================== Filter Functions ====================
  function Changedistype(e) {
    setDisplayTodos(e.target.value);
  }

  // ==================== Computed Values ====================
  const filteredTodos = useMemo(() => {
    if (DisplayTodos === "comp") {
      return todos.filter((t) => t.comp);
    } else if (DisplayTodos === "noncomp") {
      return todos.filter((t) => !t.comp);
    } else {
      return todos;
    }
  }, [todos, DisplayTodos]);

  // ==================== Main Component UI ====================
  return (
    <>
      <CssBaseline />
      <Container>
        {/* ==================== Confirmation Dialogs ==================== */}
        <>
          {/* Delete Single Todo Dialog */}
          <Dialog style={{direction: 'rtl'}} open={open} onClose={handleClose}>
            <DialogTitle>{"هل تريد حذف هذه المهمة؟"}</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{color: 'normal.main'}}>
                إذا حذفت هذه المهمة فلن تتمكن من استعادتها مرة أخرى.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='error' onClick={handleClose}>إلغاء</Button>
              <Button color="error" onClick={handleConfirmDelete}>
                نعم، قم بالحذف
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Todo Dialog */}
          <Dialog open={openEdit} onClose={() => setOpenEdit(false)} style={{direction:'rtl'}}>
            <DialogTitle>تعديل المهمة</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
              <Button onClick={handleSaveEdit} color="primary">موافق</Button>
            </DialogActions>
          </Dialog>
        </>

        {/* ==================== Main Container ==================== */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          {/* ==================== Main Card ==================== */}
          <Card
            className="Card"
            sx={{
              width: "100%",
              maxWidth: 500,
              backgroundColor: "rgba(240, 240, 229, 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 40px rgba(62, 64, 44, 0.15)",
              borderRadius: 4,
              border: "1px solid rgba(185, 169, 144, 0.3)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* ==================== Card Header ==================== */}
            <CardContent style={{ paddingBottom: "16px" }}>
              <div className="Main">
                <div className="Todo">
                  {/* Header with Title and Delete All Button */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      width: "100%",
                    }}
                  >
                    <Box sx={{ flex: 1 }} />
                    <h1
                      style={{
                        margin: 0,
                        color: "#3E402C",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        flex: 1,
                      }}
                    >
                      مهامي
                    </h1>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {todos.length > 0 && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<DeleteSweepIcon />}
                          onClick={() => setOpenDeleteAll(true)}
                          sx={{
                            borderColor: "#8B4A42",
                            color: "#8B4A42",
                            fontSize: "0.75rem",
                            minWidth: "auto",
                            px: 1.5,
                            "&:hover": {
                              backgroundColor: "#8B4A42",
                              color: "white",
                            },
                          }}
                        >
                          حذف الكل
                        </Button>
                      )}
                    </Box>
                  </Box>
                  
                  {/* Filter Buttons */}
                  <ToggleButtonGroup
                    value={DisplayTodos}
                    exclusive
                    onChange={Changedistype}
                    aria-label="Platform"
                    style={{ direction: "rtl", width: "100%" }}
                    sx={{
                      width: "100%",
                      "& .MuiToggleButton-root": {
                        color: "#3E402C",
                        borderColor: "#B9A990",
                        backgroundColor: "rgba(185, 169, 144, 0.1)",
                        flex: 1,
                        "&.Mui-selected": {
                          backgroundColor: "#3E402C",
                          color: "#F0F0E5",
                          "&:hover": {
                            backgroundColor: "#2C2E1A",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "rgba(185, 169, 144, 0.2)",
                        },
                      },
                    }}
                  >
                    <ToggleButton value="all">
                      الكل ({todos.length})
                    </ToggleButton>
                    <ToggleButton value="comp">
                      المنجز ({todos.filter((t) => t.comp).length})
                    </ToggleButton>
                    <ToggleButton value="noncomp">
                      غير المنجز ({todos.filter((t) => !t.comp).length})
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </CardContent>

            {/* ==================== Card Body & Actions ==================== */}
            <CardActions sx={{ flexDirection: "column", padding: 2 }}>
              <div className="Boxes" style={{ width: "100%" }}>
                {/* Todos List Container */}
                <Box
                  sx={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    mb: 2,
                    width: "100%",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "rgba(185, 169, 144, 0.2)",
                      borderRadius: "3px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#B9A990",
                      borderRadius: "3px",
                    },
                  }}
                >
                  {filteredTodos.length === 0 ? (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color: "#818D86",
                      }}
                    >
                      <h3>
                        لا توجد مهام{" "}
                        {DisplayTodos === "comp"
                          ? "منجزة"
                          : DisplayTodos === "noncomp"
                            ? "غير منجزة"
                            : ""}
                      </h3>
                    </Box>
                  ) : (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {filteredTodos.map((t) => (
                        <li key={t.id} style={{ marginBottom: "8px" }}>
                          <TodoItem
                            text={t.text}
                            comp={t.comp}
                            onDelete={() => handleClickOpen(t.id)}
                            onEdit={() => handleStartEdit(t.id, t.text)}
                            onCheck={() => handleToggleCheck(t.id)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </Box>

                {/* Add New Todo Section */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 1,
                    alignItems: "stretch",
                  }}
                >
                  <TextField
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && AddTodo()}
                    label="إضافة مهمة جديدة"
                    variant="outlined"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(240, 240, 229, 0.8)",
                        "& fieldset": {
                          borderColor: "#B9A990",
                        },
                        "&:hover fieldset": {
                          borderColor: "#3E402C",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#3E402C",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#818D86",
                        "&.Mui-focused": {
                          color: "#3E402C",
                        },
                      },
                    }}
                  />
                  <Button
                    onClick={AddTodo}
                    variant="contained"
                    disabled={!todo.trim()}
                    sx={{
                      minWidth: "100px",
                      backgroundColor: "#3E402C",
                      color: "#F0F0E5",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#2C2E1A",
                        transform: "translateY(-1px)",
                      },
                      "&:disabled": {
                        backgroundColor: "#818D86",
                        color: "#B9A990",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    إضافة
                  </Button>
                </Box>
              </div>
            </CardActions>

            {/* ==================== Delete All Confirmation Dialog ==================== */}
            <Dialog
              open={openDeleteAll}
              onClose={() => setOpenDeleteAll(false)}
              style={{ direction: "rtl" }}
              PaperProps={{
                sx: {
                  backgroundColor: "#F0F0E5",
                  borderRadius: 2,
                },
              }}
            >
              <DialogTitle sx={{ color: "#3E402C", fontWeight: "bold" }}>
                تأكيد حذف جميع المهام
              </DialogTitle>
              <DialogContent>
                <DialogContentText sx={{ color: "#818D86" }}>
                  هل أنت متأكد من أنك تريد حذف جميع المهام؟ هذا الإجراء لا يمكن
                  التراجع عنه.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenDeleteAll(false)}
                  sx={{ color: "#818D86" }}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleDeleteAll}
                  variant="contained"
                  sx={{
                    backgroundColor: "#8B4A42",
                    "&:hover": {
                      backgroundColor: "#6B2F28",
                    },
                  }}
                >
                  نعم، احذف الكل
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Box>
      </Container>
    </>
  );
}
