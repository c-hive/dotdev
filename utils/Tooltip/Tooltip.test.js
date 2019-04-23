import * as Tooltip from './Tooltip';

describe('Tooltip', () => {
  describe('showToolTip', () => {
    const dataCount = '2';
    const dataDate = '2019-01-01';
    let event;
    let toolTipDiv;
    let target;
    let getElementByIdSpy;

    beforeEach(() => {
      toolTipDiv = document.createElement('div');
      target = document.createElement('rect');
      target.setAttribute('data-count', dataCount);
      target.setAttribute('data-date', dataDate);

      event = {
        target,
      };
    });

    it('appends the text node to tooltip\'s div', () => {
      const text = `${dataCount} contributions on ${dataDate}`;
      const appendChildSpy = jest.fn();
      toolTipDiv.appendChild = appendChildSpy;
      getElementByIdSpy = jest.fn().mockReturnValue(toolTipDiv);
      global.document.getElementById = getElementByIdSpy;

      Tooltip.showToolTip(event);

      expect(appendChildSpy).toHaveBeenCalledWith(document.createTextNode(text));
    });
  });

  describe('hideToolTip', () => {
    let toolTipDiv;

    beforeEach(() => {
      toolTipDiv = document.createElement('div');
    });

    describe('when the toolTip doesn\'t have child', () => {
      let removeChildSpy;

      beforeEach(() => {
        removeChildSpy = jest.fn();
        toolTipDiv.removeChild = removeChildSpy;
        global.document.getElementById = jest.fn().mockReturnValue(toolTipDiv);
      });

      it('doesn\'t remove the child', () => {
        Tooltip.hideToolTip();

        expect(removeChildSpy).not.toHaveBeenCalled();
      });
    });

    describe('when the toolTip has child', () => {
      let toolTipChild;
      let removeChildSpy;

      beforeEach(() => {
        toolTipChild = document.createTextNode('');
        toolTipDiv.appendChild(toolTipChild);
        removeChildSpy = jest.fn();
        toolTipDiv.removeChild = removeChildSpy;
        global.document.getElementById = jest.fn().mockReturnValue(toolTipDiv);
      });

      it('removes the child', () => {
        Tooltip.hideToolTip();

        expect(removeChildSpy).toHaveBeenCalledWith(toolTipChild);
      });
    });
  });

  describe('addToolTipEventListeners', () => {
    let rectElements;
    let getElementsByTagNameSpy;
    let addEventListenerSpy;

    beforeEach(() => {
      rectElements = [document.createElement('rect')];
      addEventListenerSpy = jest.fn();
      rectElements[0].addEventListener = addEventListenerSpy;
      getElementsByTagNameSpy = jest.fn().mockReturnValue(rectElements);
      global.document.getElementsByTagName = getElementsByTagNameSpy;
    });

    it('adds "mouseover" eventListener with GitHubSvg.showToolTip function', () => {
      Tooltip.addToolTipEventListeners();

      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseover', Tooltip.showToolTip);
    });

    it('adds "mouseleave" eventListener with GitHubSvg.hideToolTip function', () => {
      Tooltip.addToolTipEventListeners();

      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', Tooltip.hideToolTip);
    });
  });
});
