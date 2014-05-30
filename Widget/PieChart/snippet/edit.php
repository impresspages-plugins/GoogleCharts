<div class="ip">
    <div class="ipsGoogleChartsPopup modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title"><?php echo __('Google Charts settings', 'ipAdmin') ?></h4>
                </div>

                <div class="modal-body">
                    <?php echo __('Enter chart data', 'GoogleCharts'); ?>
                    <?php echo $form->render(); ?>
                    <div class="_dataTable"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><?php echo __('Cancel', 'ipAdmin') ?></button>
                    <button type="button" class="btn btn-primary ipsConfirm"><?php echo __('Confirm', 'ipAdmin') ?></button>
                </div>
            </div>
        </div>
    </div>
</div>


