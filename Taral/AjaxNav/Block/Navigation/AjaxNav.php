<?php

namespace Taral\AjaxNav\Block\Navigation;

use Magento\Framework\View\Element\Template;

class AjaxNav extends \Magento\Framework\View\Element\Template
{
	protected $_template = 'ajax.phtml';

	public function __construct(
		\Magento\Framework\View\Element\Template\Context $context,
        array $data = []
	){
		parent::__construct($context, $data);
	}


	public function getWidgetOptionsJson(array $customOptions = [])
	{
		$options = array(
		);

		$options = array_replace_recursive($options, $customOptions);
		return json_encode(['ajaxnav.productListSidebar' => $options]);
	}
}