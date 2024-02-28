const tooltipElements = document.querySelectorAll('.has-tooltip');
let activeTooltip;

tooltipElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    const text = element.getAttribute('title');
    const position = element.getBoundingClientRect();
    
    if (activeTooltip && activeTooltip.element === element) {
      activeTooltip.tooltip.style.display = 'none';
      activeTooltip = null;
    } else {
      if (activeTooltip) {
        activeTooltip.tooltip.style.display = 'none';
      }

      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = text;

      tooltip.style.top = position.top + element.offsetHeight + 'px';
      tooltip.style.left = position.left + 'px';

      document.body.appendChild(tooltip);

      element.removeAttribute('title');

      activeTooltip = {
        element: element,
        tooltip: tooltip
      };

      const handleClickOutside = (event) => {
        if (!element.contains(event.target) && tooltip.style.display !== 'none') {
          tooltip.style.display = 'none';
          document.removeEventListener('click', handleClickOutside);
        }
      };

      const handleElementClick = (event) => {
        if (tooltip.style.display === 'none') {
          tooltip.style.display = 'block';
        } else {
          tooltip.style.display = 'none';
          document.removeEventListener('click', handleElementClick);
        }
      };

      document.addEventListener('click', handleClickOutside);
      element.addEventListener('click', handleElementClick);
    }
  });
});
