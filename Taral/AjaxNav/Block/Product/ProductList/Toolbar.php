<?php
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Taral\AjaxNav\Block\Product\ProductList;

use Magento\Catalog\Helper\Product\ProductList;
use Magento\Catalog\Model\Product\ProductList\Toolbar as ToolbarModel;

/**
 * Product list toolbar
 *
 * @author      Magento Core Team <core@magentocommerce.com>
 * @SuppressWarnings(PHPMD.TooManyFields)
 * @SuppressWarnings(PHPMD.CouplingBetweenObjects)
 */
class Toolbar extends \Magento\Catalog\Block\Product\ProductList\Toolbar
{

    /**
     * Retrieve widget options in json format
     *
     * @param array $customOptions Optional parameter for passing custom selectors from template
     * @return string
     */
    public function getWidgetOptionsJson(array $customOptions = [])
    {
        $defaultMode = $this->_productListHelper->getDefaultViewMode($this->getModes());
        $options = [
        'mode' => ToolbarModel::MODE_PARAM_NAME,
        'direction' => ToolbarModel::DIRECTION_PARAM_NAME,
        'order' => ToolbarModel::ORDER_PARAM_NAME,
        'limit' => ToolbarModel::LIMIT_PARAM_NAME,
        'modeDefault' => $defaultMode,
        'directionDefault' => $this->_direction ?: ProductList::DEFAULT_SORT_DIRECTION,
        'orderDefault' => $this->_productListHelper->getDefaultSortField(),
        'limitDefault' => $this->_productListHelper->getDefaultLimitPerPageValue($defaultMode),
        'url' => $this->getPagerUrl(),
        ];
        $options = array_replace_recursive($options, $customOptions);
        return json_encode(['ajaxnav.productListToolbar' => $options]);
    }
}
