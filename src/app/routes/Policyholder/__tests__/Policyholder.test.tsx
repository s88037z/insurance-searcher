import { initDb } from "@/mocks/db";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, act } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import PolicyholderRoute from "..";
import AppProvider from "@/app/AppProvider";
import { waitForLoadingToFinish } from "@/testing/utils";

const renderApp = () => {
  const mockCodes = initDb();
  const router = createMemoryRouter(
    [
      {
        path: "/policyholders",
        element: <PolicyholderRoute />,
      },
    ],
    {
      initialEntries: ["/", "/policyholders"],
      initialIndex: 1,
    },
  );

  render(<PolicyholderRoute />, {
    wrapper: () => {
      return (
        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      );
    },
  });

  return { mockCodes };
};
describe("Policyholder route main functionalities", () => {
  test("Title and search bar should be rendered", async () => {
    renderApp();
    expect(screen.getByText(/policyholder searcher/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter policyholder code/i),
    ).toBeInTheDocument();
  });

  test("Search policyholder should render correctly", async () => {
    const { mockCodes } = renderApp();
    const searchInput = screen.getByPlaceholderText(/enter policyholder code/i);
    const searchBtn = screen.getByDisplayValue(/search/i);

    // Search with unknown code
    await userEvent.type(searchInput, "UnknownCode");
    await userEvent.click(searchBtn);
    await waitForLoadingToFinish();
    expect(screen.getByText(/Not found/i)).toBeInTheDocument();

    // Search with valid code
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, mockCodes[0]);
    await userEvent.click(searchBtn);
    await waitForLoadingToFinish();

    const policyholderCodes = screen.getAllByLabelText(/Policyholder Code/i);
    policyholderCodes.forEach((code, index) => {
      const sibling = code.nextElementSibling;
      expect(sibling).toBeInTheDocument();
      expect(sibling).toHaveTextContent(/Policyholder Name/i);
      expect(code).toHaveTextContent(mockCodes[index]);
    });
  });

  test("Policyholder navigation should work correctly", async () => {
    const { mockCodes } = renderApp();
    const searchInput = screen.getByPlaceholderText(/enter policyholder code/i);
    const searchBtn = screen.getByDisplayValue(/search/i);

    await userEvent.type(searchInput, mockCodes[0]);
    await userEvent.click(searchBtn);
    await waitForLoadingToFinish();
    let rootPolicyholder = screen.getAllByLabelText(/Policyholder Code/i)[0];
    expect(rootPolicyholder).toHaveTextContent(mockCodes[0]);

    // Navigate to child
    const childPolicyholder = screen.getByText(mockCodes[2]);
    await userEvent.click(childPolicyholder);
    await waitForLoadingToFinish();
    rootPolicyholder = screen.getAllByLabelText(/Policyholder Code/i)[0];
    expect(rootPolicyholder).toHaveTextContent(mockCodes[2]);

    //Navigate to parent
    const previousLevelBtn = screen.getByText(/Previous level/i);
    await waitFor(() => expect(previousLevelBtn).not.toBeDisabled());
    await act(async () => await previousLevelBtn.click());
    const policyholders = await screen.findAllByLabelText(/Policyholder Code/i);
    expect(policyholders[0]).toHaveTextContent(mockCodes[0]);
  });
});
