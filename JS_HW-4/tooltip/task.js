const tooltipElements = document.querySelectorAll('.has-tooltip');
const tooltips = [];

tooltipElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    const text = element.getAttribute('title');
    const position = element.getBoundingClientRect();

    const existingTooltip = tooltips.find((tooltip) => tooltip.element === element);

    if (existingTooltip) {
      existingTooltip.tooltip.parentNode.removeChild(existingTooltip.tooltip);
      tooltips.splice(tooltips.indexOf(existingTooltip), 1);
    } else {
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = text;

      tooltip.style.top = position.top + element.offsetHeight + 'px';
      tooltip.style.left = position.left + 'px';

      document.body.appendChild(tooltip);

      tooltips.push({
        element: element,
        tooltip: tooltip
      });
    }

    element.removeAttribute('title');

    const handleClickOutside = (event) => {
      if (!element.contains(event.target) && !tooltip.contains(event.target)) {
        tooltip.parentNode.removeChild(tooltip);
        document.removeEventListener('click', handleClickOutside);

        tooltips.splice(tooltips.indexOf(tooltip), 1);
      }
    };

    document.addEventListener('click', handleClickOutside);
  });
});
