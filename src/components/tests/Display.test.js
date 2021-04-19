import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import mockFetchShow from "../../api/fetchShow"
jest.mock('../../api/fetchShow');

const testShow = {
    name:"My Hero Academia",
    summary: "Deku",
    seasons: [
      {
           id: 0,
        name: "Season 1",
        episodes: []
      },
      {
          id: 1,
          name: "Season 2",
          episodes: []
      }
    ]
    //add in approprate test data structure here.
}


test('renders display with no props ', ()=>{
   render(<Display/>) 
});

//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.

test('renders display of show component ',async ()=>{
    render(<Display/>)

    mockFetchShow.mockResolvedValueOnce(testShow);
    const pushButton = screen.getByRole("button", /press to get show data/i);
    userEvent.click(pushButton);

    const showRender = await screen.findByTestId("show-container");
    expect(showRender).toBeInTheDocument();
    expect(showRender).toHaveTextContent(/my hero academia/i)

});

//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.

test('renders  ',async()=>{
    render(<Display/>)
    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole("button", /press to get show data/i);
    userEvent.click(button)    
    const getSeason = await screen.findAllByTestId("season-option");

    expect(getSeason).toHaveLength(2);
});


//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.

test('renders ', ()=>{
    const mockDisplay = jest.fn();
    render(<Display displayFunc={mockDisplay} />);

    mockFetchShow.mockResolvedValueOnce(testShow);
    const button = screen.getByRole("button", /press to get show data/i);
    userEvent.click(button) ;

    waitFor(() => expect(mockDisplay).toHaveBeenCalledTimes(1))

});











///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.


