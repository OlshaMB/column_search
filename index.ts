let column_search = (table, config = {
  bootstrap: true
}) =>{
  let columns = table.columns()[0];
  let search_row = document.createElement("tr");
  columns.forEach((n)=>{
    let column = table.column(n);
    let search_cell = document.createElement("th");
    let input = document.createElement("input");
    if (config.bootstrap) {
      input.classList.add("form-control")
      input.classList.add("p-0.5");
    }
    input.placeholder = column.header().innerText
    if (config.styles) {
      input.classList.add(config.styles)
    }
    input.addEventListener("keyup", (ev)=>{
      column.search(ev.target.value).draw()
    })
    search_cell.appendChild(input)
    search_row.appendChild(search_cell)
  })
  table.table().header().appendChild(search_row);
}
$.fn.DataTable.ColumnSearch = column_search
$(document).on("preInit.dt.dtColumnSearch", (_ev, data)=>{
  const api = (new DataTable.Api(data));
  let settings = api.settings()[0].oInit;
  if (settings.column_search){
    column_search(api, settings.column_search)
  }
})
export default column_search;