import ReservationPostCSS from './ReservationPost.module.css';

function ReservationPost(){

    return(

        <>
            <div className={ ReservationPostCSS.PostDiv }>
                <div className={ ReservationPostCSS.PostInfoDiv }>
                    <h4>신청자 ID</h4>
                    <input
                        name='ReservationMemberId'
                        placeholder='예약 신청 아이디'
                        autoComplate='off'
                        value={ token.sub || '' }
                        className={ ReservationPostCSS.ReservInput }
                    />
                    <input
                        name='ReservationMemberId'
                        placeholder='예약 신청 아이디'
                        autoComplate='off'
                        value={ token.sub || '' }
                        className={ ReservationPostCSS.ReservInput }
                    />
                    <input
                        name='ReservationMemberId'
                        placeholder='예약 신청 아이디'
                        autoComplate='off'
                        value={ token.sub || '' }
                        className={ ReservationPostCSS.ReservInput }
                    />
                    <input/>
                </div>
            </div>
        </>

    );

}

export default ReservationPost;