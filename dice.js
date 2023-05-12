const diceData = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
  ];
  
  const pageSize = 10; // maximum number of dices per page
  let currentPage = 1; // start at page 1
  
  function renderDiceBoard(page) {
    // Clear any previous dice data
    const diceBoard = document.getElementById('dice-board');
    diceBoard.innerHTML = '';
  
    // Get the data for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = diceData.slice(startIndex, endIndex);
  
    // Create HTML for the dice
    const diceHtml = currentPageData.map(dice => `<div class="dice">${dice.value}</div>`).join('');
    diceBoard.innerHTML = diceHtml;
  }
  
  function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
  
    // Only render pagination if there are more than 10 dices
    if (diceData.length <= pageSize) {
      return;
    }
  
    // Number of pages needed
    const totalPages = Math.ceil(diceData.length / pageSize);
  
    // HTML for the pagination
    const paginationHtml = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="${currentPage === 1}">Previous</a>
      </li>
      ${Array.from({ length: totalPages }, (_, i) => `
        <li class="page-item ${i + 1 === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i + 1}">${i + 1}</a>
        </li>
      `).join('')}
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#">Next</a>
      </li>
    `;
    pagination.innerHTML = paginationHtml;
  
    pagination.querySelectorAll('a').forEach(link => {
      if (!link.hasAttribute('aria-disabled')) {
        link.addEventListener('click', e => {
          e.preventDefault();
          currentPage = parseInt(e.target.dataset.page);
          renderDiceBoard(currentPage);
          renderPagination();
        });
      }
    });
  }
  
  renderDiceBoard(currentPage);
  renderPagination();
  