import React from 'react';
import Errors from 'components/Shared/Errors';

export default function Index() {
    return (
        <>
            {/* tooltips */}
            {/* <InfoTooltip id="priority-value" type="light" effect="solid">
                <span>Priority value</span>
                <span>0 - 100</span>
                <small>(Lower - Higher)</small>
            </InfoTooltip>

            <InfoTooltip id="priority-name" type="light" effect="solid">
                <span>Priority name</span>
            </InfoTooltip> */}

            <div className="text-center">
                <h4>Priorities</h4>
                <hr />
                <div className="row align-items-center d-flex flex-column">
                    <div className="col-md-6">
                        <Errors />
                    </div>
                </div>
            </div>

            {/* creating model */}
            {/* {renderCreatingModel()} */}

            <div className="tlist mt-2">
                {/* {priorities
                    .sort((item1, item2) => item1.todoPrioritySort <= item2.todoPrioritySort ? 1 : -1)
                    .map((item: ITodoPriorityGetDTO) => renderItem(item))} */}
            </div>
        </>
    )
}